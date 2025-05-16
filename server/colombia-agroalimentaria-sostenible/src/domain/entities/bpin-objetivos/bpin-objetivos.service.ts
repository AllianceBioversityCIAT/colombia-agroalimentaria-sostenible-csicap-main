import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, In } from 'typeorm';
import { BpinObjetivo } from './entities/bpin-objetivo.entity';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';
import { FilterBpinObjetivosDto } from './dto/filter-bpin-objetivos.dto';
import * as ExcelJS from 'exceljs';
import axios from 'axios';
import { Readable } from 'stream';
import { GetPlanOperativoDto } from './dto/get-plan-operativo.dto';

@Injectable()
export class BpinObjetivosService {
  constructor(
    private readonly mainRepo: BpinObjetivoRepository
  ) {}

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

    hoja.getCell('E3').value = 'CIAT';
    hoja.getCell('E4').value = new Date().getFullYear();

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
      let valorPresupuesto = fila.presupuesto;
      if (typeof valorPresupuesto === 'string') {
        valorPresupuesto = Number(valorPresupuesto.replace(/[^0-9.-]/g, ''));
      }
      if (!isNaN(valorPresupuesto)) {
        celdaPresupuesto.value = valorPresupuesto;
      } else {
        celdaPresupuesto.value = '';
      }


      const numeroProducto  = row.getCell('G');
      numeroProducto.style = {};
      if (fila.numero_producto) {
        numeroProducto.value = fila.numero_producto;
        numeroProducto.numFmt = '0';
      } else {
        numeroProducto.value = '';
      }
      
      const celdaFecha = row.getCell('J');
      numeroProducto.style = {};
      if (fila.fecha_entrega) {
        celdaFecha.value = new Date(fila.fecha_entrega);
        celdaFecha.numFmt = 'dd/mm/yyyy';
      } else {
        celdaFecha.value = '';
      }

      row.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left',
          wrapText: true,
        };
      });

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

  const estructurado = this.estructurarObjetivos1(rawData);
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

async getPlanOperativoSocio(userId: string, filtros: GetPlanOperativoDto) {
  let { objetivo, actividad_id, subactividad_id, eje_id, producto_id } = filtros;

  if (!objetivo || objetivo === '') {
  objetivo = '1';
  }
  try {
  const org =  await this.mainRepo
  .createQueryBuilder()
  .select('p.organizacion', 'organizacionId')
  .from('personas', 'p')
  .where('p.id = :userId', { userId })
  .getRawOne();

  if (!org) {
    throw new NotFoundException('Organización del usuario no encontrada');
  }

  const condiciones: string[] = ['o.id = ?', 'spxo.organizacion_id = ?'];
  const queryParams: any[] = [objetivo, org.organizacionId];

  if (actividad_id) {
    condiciones.push('a.id = ?');
    queryParams.push(filtros.actividad_id);
  }

  if (subactividad_id) {
    condiciones.push('sa.id = ?');
    queryParams.push(filtros.subactividad_id);
  }

  if (producto_id) {
    condiciones.push('p.id = ?');
    queryParams.push(filtros.producto_id);
  }

  if (eje_id) {
    condiciones.push('e.id = ?');
    queryParams.push(filtros.eje_id);
  }

  const whereClause = condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : '';

  console.log(org);
  const rawData = await this.mainRepo.query(`
    SELECT
      o.id AS objetivo_id,
      o.nombre AS objetivo,
      a.id AS actividad_id,
      a.nombre AS actividad,
      (SELECT COUNT(*) FROM BPIN_productos bp2
      LEFT JOIN BPIN_sub_actividades bsa2 ON bp2.BPIN_subactividades_id = bsa2.id
      WHERE bsa2.BPIN_actividades_id = a.id) AS productos_por_actividad,
      sa.id AS subactividad_id,
      sa.nombre AS subactividad,
      (SELECT COUNT(*) FROM BPIN_productos 
      WHERE BPIN_subactividades_id = sa.id) AS productos_por_subactividad,
      p.id AS producto_id,
      p.nombre AS producto_nombre,
      GROUP_CONCAT(DISTINCT e.nombre ORDER BY e.nombre SEPARATOR ', ') AS eje_nombre
    FROM BPIN_objetivos o
    LEFT JOIN BPIN_actividades a ON a.BPIN_objetivos_codigo = o.id
    LEFT JOIN BPIN_sub_actividades sa ON sa.BPIN_actividades_id = a.id
    LEFT JOIN BPIN_productos p ON p.BPIN_subactividades_id = sa.id
    LEFT JOIN BPIN_productos_x_eje pe ON pe.producto_id = p.id
    LEFT JOIN GCF_ejes e ON e.id = pe.eje_id
    LEFT JOIN BPIN_subproductos sp ON sp.producto_id = p.id
    LEFT JOIN subprod_x_org_x_sistoperativo spxosp ON spxosp.subproducto_id = sp.id
    LEFT JOIN sistemaprod_x_organizacion spxo ON spxo.id = spxosp.org_x_sistprod_id
    ${whereClause}
    GROUP BY 
      o.id, o.nombre, sa.id,
      a.id, a.codigo, a.nombre, 
      sa.nombre, p.id, p.nombre;
  `, queryParams);

  if (!rawData || rawData.length === 0) {
    throw new NotFoundException('No se encontraron resultados con los filtros aplicados');
  }

const objetivos = await this.mainRepo
  .createQueryBuilder('o')
  .select([
    'o.id',
    "CONCAT('Objetivo ', o.id) AS resumen",
    'o.nombre'
  ])
  .where(qb => {
    const subquery = qb.subQuery()
      .select('1')
      .from('BPIN_subproductos', 'sp')
      .innerJoin('BPIN_productos', 'p', 'p.id = sp.producto_id')
      .innerJoin('BPIN_sub_actividades', 'sa', 'sa.id = p.BPIN_subactividades_id')
      .innerJoin('BPIN_actividades', 'a', 'a.id = sa.BPIN_actividades_id')
      .innerJoin('subprod_x_org_x_sistoperativo', 'spxosp', 'spxosp.subproducto_id = sp.id')
      .innerJoin('sistemaprod_x_organizacion', 'spxo', 'spxo.id = spxosp.org_x_sistprod_id')
      .where('a.BPIN_objetivos_codigo = o.id')
      .andWhere('spxo.organizacion_id = :orgId')
      .getQuery();
    return `EXISTS ${subquery}`;
  })
  .setParameter('orgId', org.organizacionId)
  .getRawMany();

  const estructurado = this.estructurarObjetivos1(rawData);
  return {
  objetivos: objetivos,
  planOperativo: estructurado,
  };
  } catch (error) {
  throw error;
}

}

private estructurarObjetivos1(data: any[]) {
  const mapa = new Map();

  for (const row of data) {
    const objetivoId = row.objetivo_id;
    const objetivoNombre = row.objetivo ?? row.objetivo_nombre;

    if (!objetivoId || !objetivoNombre) continue;

    if (!mapa.has(objetivoId)) {
      mapa.set(objetivoId, {
        id_obj: objetivoId,
        nombre_obj: objetivoNombre,
        actividades: []
      });
    }
    const obj = mapa.get(objetivoId);

    // Actividad
    const actividadId = row.actividad_id;
    const actividadNombre = row.actividad ?? row.actividad_nombre;

    if (!actividadId || !actividadNombre) continue;

    let actividad = obj.actividades.find((a: any) => a.id === actividadId);
    if (!actividad) {
      actividad = {
        id: actividadId,
        nombre_actv: actividadNombre,
        rowspan: row.productos_por_actividad ?? 1,
        subactividades: []
      };
      obj.actividades.push(actividad);
    }

    // Subactividad
    const subactividadId = row.subactividad_id;
    const subactividadNombre = row.subactividad ?? row.subactividad_nombre;

    if (!subactividadId || !subactividadNombre) continue;

    let subactividad = actividad.subactividades.find((s: any) => s.id === subactividadId);
    if (!subactividad) {
      subactividad = {
        id: subactividadId,
        nombre_subActv: subactividadNombre,
        rowspan: row.productos_por_subactividad ?? 1,
        presupuesto: row.subactividad_presupuesto ?? undefined,
        productos: []
      };

      // Quitar "presupuesto" si es null o 0
      if (!subactividad.presupuesto) delete subactividad.presupuesto;

      actividad.subactividades.push(subactividad);
    }

    // Producto
    const productoId = row.producto_id;
    if (!productoId) continue;

    let producto = subactividad.productos.find((p: any) => p.id === productoId);
    if (!producto) {
      producto = {
        id: productoId
      };

      if (row.producto_codigo) producto.codigo = row.producto_codigo;
      if (row.producto_nombre) producto.nombre_prod = row.producto_nombre;
      if (row.producto_descripcion) producto.descripcion = row.producto_descripcion;
      if (row.producto_fecha_entrega) producto.fechaEntrega = row.producto_fecha_entrega;

      // Ejes
      const ejesRaw = row.eje_nombre ?? row.ejes ?? '';
      const ejes = ejesRaw
        .split(',')
        .map((e: string) => e.trim())
        .filter(Boolean);
      if (ejes.length > 0) producto.ejes = ejes;

      // Responsables
      const responsablesRaw = row.responsables_nombre ?? '';
      const responsables = responsablesRaw
        .split(',')
        .map((r: string) => r.trim())
        .filter(Boolean);
      if (responsables.length > 0) producto.responsables = responsables;

      subactividad.productos.push(producto);
    }
  }

  return Array.from(mapa.values());
}


}
