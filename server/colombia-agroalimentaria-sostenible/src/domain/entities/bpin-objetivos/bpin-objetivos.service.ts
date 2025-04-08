import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BpinObjetivo } from './entities/bpin-objetivo.entity';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';
import { FilterBpinObjetivosDto } from './dto/filter-bpin-objetivos.dto';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { Readable } from 'stream';

@Injectable()
export class BpinObjetivosService {
  constructor(private readonly mainRepo: BpinObjetivoRepository) {}

  async findFichaBPIN(
    filter?: FilterBpinObjetivosDto,
  ): Promise<BpinObjetivo[]> {
    const whereFilter: FindOptionsWhere<BpinObjetivo> = {};
    if (filter.objectiveId) {
      whereFilter.id = In(filter.objectiveId);
    }
    return this.mainRepo.find({
      where: {
        ...whereFilter,
        is_active: true,
        bpinActividades: {
          is_active: true,
          bpinSubActividades: {
            is_active: true,
          },
        },
      },
      relations: {
        bpinActividades: {
          bpinSubActividades: true,
        },
      },
    });
  }

  async findObjetivos(): Promise<BpinObjetivo[]> {
    return this.mainRepo.find({
      select: {
        id: true,
        nombre: true,
      },
      where: {
        is_active: true,
      },
    });
  }

  async getCampos(){
    return this.mainRepo
    .createQueryBuilder('objetivo')
    .select([
      "CONCAT(objetivo.id, '. ', objetivo.nombre) AS objetivo",
      "CONCAT(actividad.codigo, '. ', actividad.nombre) AS actividad",
      "CONCAT(subactividad.codigo, '. ', subactividad.nombre) AS subactividad",
      "subactividad.presupuesto AS presupuesto",
      "GROUP_CONCAT(DISTINCT ejes.nombre ORDER BY ejes.nombre SEPARATOR ', ') AS ejes",
      "GROUP_CONCAT(DISTINCT responsable.persona_id ORDER BY responsable.persona_id SEPARATOR ', ') AS responsables",
      "producto.id AS numero_producto",
      "producto.nombre AS producto",
      "producto.descripcion_alcance AS descripcion",
      "producto.fecha_entrega AS fecha_entrega"
    ])
    .leftJoin("objetivo.bpinActividades", "actividad")
    .leftJoin("actividad.bpinSubActividades", "subactividad")
    .leftJoin("subactividad.bpinProductos", "producto")
    .leftJoin("producto.bpinResponsables", "responsable")
    .leftJoin("producto.bpinProductosXEje", "productoxejes")
    .leftJoin("productoxejes.gcfEje", "ejes")
    .groupBy("objetivo.id")
    .addGroupBy("actividad.id") 
    .addGroupBy("subactividad.id")
    .addGroupBy("producto.id")
    .getRawMany();
  }

  async generarExcel(): Promise<Readable> {
    const data = await this.getCampos();

    const workbook = new ExcelJS.Workbook();
    const plantillaPath = path.resolve(process.cwd(), 'src/domain/templates/Plantilla_Plan_Operativo_CIAT.xlsx');
    await workbook.xlsx.readFile(plantillaPath);

    const hoja = workbook.getWorksheet(1);

    const logoPath = path.resolve(process.cwd(), 'src/domain/templates/Logo_CGIAR.jpg');
    const imageId = workbook.addImage({
      filename: logoPath,
      extension: 'png',
    });

    hoja.addImage(imageId, {
      tl: { col: 0, row: 0 },
      ext: { width: 200, height: 80 }, // tamaño del logo
    });
    hoja.getCell('D3').value = 'CIAT';
    hoja.getCell('D4').value = 2025;

    let rowIndex = 8;

    data.forEach((fila) => {
      const row = hoja.getRow(rowIndex);
      row.getCell('A').value = fila.objetivo ?? '';
      row.getCell('B').value = fila.actividad ?? '';
      row.getCell('C').value = fila.subactividad ?? '';
      row.getCell('D').value = fila.presupuesto ?? '';
      row.getCell('E').value = fila.ejes ?? '';
      row.getCell('F').value = fila.responsables ?? '';
      row.getCell('G').value = fila.numero_producto ?? '';
      row.getCell('H').value = fila.producto ?? '';
      row.getCell('I').value = fila.descripcion ?? '';
      row.getCell('J').value = fila.fecha_entrega ?? '';
      row.commit();
      rowIndex++;
    });
  
    const buffer = await workbook.xlsx.writeBuffer();
    return Readable.from([buffer]);
  }

async planOperativoCIAT() {
  const rawData = await this.mainRepo.query(`
    SELECT 
      bo.id AS objetivo_id,
      bo.nombre AS objetivo_nombre,
      ba.codigo AS actividad_codigo,
      ba.nombre AS actividad_nombre,
      bsa.codigo AS subactividad_codigo,
      bsa.nombre AS subactividad_nombre,
      bsa.presupuesto AS subactividad_presupuesto,
      bp.id AS producto_id,
      bp.nombre AS producto_nombre,
      bp.descripcion_alcance AS producto_descripcion,
      bp.fecha_entrega AS producto_fecha_entrega,
      GROUP_CONCAT(DISTINCT ge.nombre ORDER BY ge.nombre SEPARATOR ', ') AS eje_nombre,
      GROUP_CONCAT(DISTINCT CONCAT(p.nombre, ' ', p.apellido) ORDER BY p.nombre SEPARATOR ', ') AS responsables_nombre
    FROM 
      BPIN_objetivos bo
    LEFT JOIN BPIN_actividades ba ON bo.id = ba.BPIN_objetivos_codigo
    LEFT JOIN BPIN_sub_actividades bsa ON ba.id = bsa.BPIN_actividades_id
    LEFT JOIN BPIN_productos bp ON bsa.id = bp.BPIN_subactividades_id
    LEFT JOIN BPIN_responsables br ON bp.id = br.BPIN_producto_id
    LEFT JOIN	personas p ON br.persona_id = p.id
    LEFT JOIN BPIN_productos_x_eje bpxe ON bp.id = bpxe.producto_id
    LEFT JOIN GCF_ejes ge ON bpxe.eje_id = ge.id
    GROUP BY 
    bo.id, bo.nombre,
    ba.codigo, ba.nombre,
    bsa.codigo, bsa.nombre, bsa.presupuesto,
    bp.id, bp.nombre, bp.descripcion_alcance, bp.fecha_entrega
  `);

  const estructurado = this.estructurarObjetivos(rawData);
  return estructurado;
}

private estructurarObjetivos(data: any[]) {
  const mapa = new Map();

  for (const row of data) {
    // Objetivo
    if (!mapa.has(row.objetivo_id)) {
      mapa.set(row.objetivo_id, {
        id_obj: row.objetivo_id,
        nombre_obj: row.objetivo_nombre,
        actividades: []
      });
    }
    const obj = mapa.get(row.objetivo_id);

    // Actividad
    let actividad = obj.actividades.find(a => a.codigo === row.actividad_codigo);
    if (!actividad) {
      actividad = {
        codigo_actv: row.actividad_codigo,
        nombre_actv: row.actividad_nombre,
        subactividades: []
      };
      obj.actividades.push(actividad);
    }

    // Subactividad
    let subactividad = actividad.subactividades.find(s => s.codigo === row.subactividad_codigo);
    if (!subactividad) {
      subactividad = {
        codigo_subActv: row.subactividad_codigo,
        nombre_subActv: row.subactividad_nombre,
        presupuesto: row.subactividad_presupuesto,
        productos: []
      };
      actividad.subactividades.push(subactividad);
    }

    // Producto
    let producto = subactividad.productos.find(p => p.id === row.producto_id);
    if (!producto) {
      producto = {
        id_prod: row.producto_id,
        nombre_prod: row.producto_nombre,
        descripcion: row.producto_descripcion,
        fechaEntrega: row.producto_fecha_entrega,
        ejes: [],
        responsables: []
      };
      subactividad.productos.push(producto);
    }

    // Ejes
    if (row.eje_nombre && !producto.ejes.includes(row.eje_nombre)) {
      producto.ejes.push(row.eje_nombre);
    }

    // Responsables
    const responsableNombre = row.responsables_nombre?.trim();
    if (responsableNombre && !producto.responsables.includes(responsableNombre)) {
      producto.responsables.push(responsableNombre);
    }
  }

  return Array.from(mapa.values());
}

}
