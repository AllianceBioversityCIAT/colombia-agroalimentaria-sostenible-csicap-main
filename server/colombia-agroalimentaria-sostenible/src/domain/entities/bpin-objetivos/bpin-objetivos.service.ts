import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BpinObjetivo } from './entities/bpin-objetivo.entity';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';
import { FilterBpinObjetivosDto } from './dto/filter-bpin-objetivos.dto';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import axios from 'axios';
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
      "GROUP_CONCAT(DISTINCT CONCAT(personas.nombre, ' ', personas.apellido) ORDER BY personas.nombre SEPARATOR ', ') AS responsables",
      "producto.id AS numero_producto",
      "producto.nombre AS producto",
      "producto.descripcion_alcance AS descripcion",
      "producto.fecha_entrega AS fecha_entrega"
    ])
    .leftJoin("objetivo.bpinActividades", "actividad")
    .leftJoin("actividad.bpinSubActividades", "subactividad")
    .leftJoin("subactividad.bpinProductos", "producto")
    .leftJoin("producto.bpinResponsables", "responsable")
    .leftJoin('personas', 'personas', 'responsable.persona_id = personas.id')
    .leftJoin("producto.bpinProductosXEje", "productoxejes")
    .leftJoin("productoxejes.gcfEje", "ejes")
    .groupBy("objetivo.id")
    .addGroupBy("actividad.id") 
    .addGroupBy("subactividad.id")
    .addGroupBy("producto.id")
    .getRawMany();
  }

  async generarExcel(): Promise<Readable> {
    const url = 'https://media-resources-csicap.s3.us-east-1.amazonaws.com/operational-plan/Plantilla_Plan_Operativo_CIAT.xlsx ';

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const data = await this.getCampos();

    const hoja = workbook.getWorksheet(1);

    hoja.getCell('D3').value = 'CIAT';
    hoja.getCell('D4').value = new Date().getFullYear();

    let rowIndex = 8;

    data.forEach((fila) => {
      const row = hoja.getRow(rowIndex);
      row.getCell('A').value = fila.objetivo ?? '';
      row.getCell('B').value = fila.actividad ?? '';
      row.getCell('C').value = fila.subactividad ?? '';
      row.getCell('E').value = fila.ejes ?? '';
      row.getCell('F').value = fila.responsables ?? '';
      row.getCell('H').value = fila.producto ?? '';
      row.getCell('I').value = fila.descripcion ?? '';

      const celdaPresupuesto  = row.getCell('D');
      if (fila.presupuesto) {
        celdaPresupuesto.value = Number(fila.presupuesto);
        celdaPresupuesto.numFmt = '#,##0.00';
      } else {
        celdaPresupuesto .value = '';
      }

      const numeroProducto  = row.getCell('G');
      if (fila.numero_producto) {
        numeroProducto.value = Number(fila.numero_producto);
      } else {
        numeroProducto .value = '';
      }
      
      const celdaFecha = row.getCell('J');
      if (fila.fecha_entrega) {
        celdaFecha.value = new Date(fila.fecha_entrega);
        celdaFecha.numFmt = 'dd/mm/yyyy';
      } else {
        celdaFecha.value = '';
      }

      row.commit();
      rowIndex++;
    });


  
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return Readable.from([excelBuffer]);
  }

async planOperativoCIAT() {
  const rawData = await this.mainRepo.query(`
  SELECT 
    bo.id AS objetivo_id,
    CONCAT(bo.id, '. ', bo.nombre) AS objetivo,
    ba.id AS actividad_id,
    CONCAT(ba.codigo, '. ', ba.nombre) AS actividad,
    (SELECT COUNT(*) FROM BPIN_productos bp2
    LEFT JOIN BPIN_sub_actividades bsa2 ON bp2.BPIN_subactividades_id = bsa2.id
    WHERE bsa2.BPIN_actividades_id = ba.id) AS productos_por_actividad,
    bsa.id AS subactividad_id,
    CONCAT(bsa.codigo, '. ', bsa.nombre) AS subactividad,
    (SELECT COUNT(*) FROM BPIN_productos WHERE BPIN_subactividades_id = bsa.id) AS productos_por_subactividad,
    bsa.presupuesto AS subactividad_presupuesto,
    bp.id AS producto_id,
    bp.codigo AS producto_codigo,
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
  LEFT JOIN personas p ON br.persona_id = p.id
  LEFT JOIN BPIN_productos_x_eje bpxe ON bp.id = bpxe.producto_id
  LEFT JOIN GCF_ejes ge ON bpxe.eje_id = ge.id
  GROUP BY 
    bo.id, bo.nombre, bsa.id,
    ba.id, ba.codigo, ba.nombre,
    bsa.codigo, bsa.nombre, bsa.presupuesto,
    bp.id, bp.nombre, bp.descripcion_alcance, bp.fecha_entrega;
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
        nombre_obj: row.objetivo,
        actividades: []
      });
    }
    const obj = mapa.get(row.objetivo_id);

    // Actividad
    let actividad = obj.actividades.find(a => a.id === row.actividad_id);
    if (!actividad) {
      actividad = {
        id: row.actividad_id,
        nombre_actv: row.actividad,
        rowspan: row.productos_por_actividad,
        subactividades: []
      };
      obj.actividades.push(actividad);
    }

    // Subactividad
    let subactividad = actividad.subactividades.find(s => s.id === row.subactividad_id);
    if (!subactividad) {
      subactividad = {
        id: row.subactividad_id,
        nombre_subActv: row.subactividad,
        rowspan: row.productos_por_subactividad,
        presupuesto: row.subactividad_presupuesto,
        productos: []
      };
      actividad.subactividades.push(subactividad);
    }

    // Producto
    if (row.producto_id) {
      let producto = subactividad.productos.find(p => p.id === row.producto_id);
      if (!producto) {
        producto = {
          id: row.producto_id,
          codigo: row.producto_codigo,
          nombre_prod: row.producto_nombre,
          descripcion: row.producto_descripcion,
          fechaEntrega: row.producto_fecha_entrega,
          ejes: [],
          responsables: []
        };
        subactividad.productos.push(producto);
      }

      // Ejes
      if (row.eje_nombre) {
        const ejes = row.eje_nombre.split(',').map(e => e.trim());
        for (const eje of ejes) {
          if (!producto.ejes.includes(eje)) {
            producto.ejes.push(eje);
          }
        }
      }

      // Responsables
      if (row.responsables_nombre) {
        const responsables = row.responsables_nombre.split(',').map(r => r.trim());
        for (const resp of responsables) {
          if (!producto.responsables.includes(resp)) {
            producto.responsables.push(resp);
          }
        }
      }
    }
  }

  return Array.from(mapa.values());
}

}
