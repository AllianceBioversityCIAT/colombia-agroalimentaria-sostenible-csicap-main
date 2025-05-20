import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BpinSubproducto } from './entities/bpin-subproducto.entity';
import { GetSubProductoDto } from './dto/get-bpin-suproducto.dto';
import { get } from 'http';

@Injectable()
export class BpinSubproductoService {
constructor(
  @InjectRepository(BpinSubproducto)
  private readonly subproductoRepository: Repository<BpinSubproducto>,
) {}

async obtenerSubproductosPorProducto(userId: string, filtro: GetSubProductoDto): Promise<any> {
  let { producto_id, subproducto_id } = filtro;
    const p_id = producto_id ?? 1;
    const sp_id = subproducto_id ?? 1;

    try{
      const org =  await this.subproductoRepository
        .createQueryBuilder()
        .select('p.organizacion', 'organizacionId')
        .from('personas', 'p')
        .where('p.id = :userId', { userId })
        .getRawOne();

    const data = await this.subproductoRepository
        .createQueryBuilder('p')
        .select([
            'p.id AS producto_id',
            'p.nombre AS producto_nombre',
            `GROUP_CONCAT(DISTINCT ge.nombre ORDER BY ge.nombre SEPARATOR ', ') AS ejes`,
            'sp.id_x_producto AS subproducto_id',
            'sp.nombre AS subproducto_nombre',
            'sp.que_se_hara AS que_se_hara',
            'sp.metodologia AS metodologia',
            'sp.como_se_reportara AS como_se_reportara',
            'l.id AS lugar_id',
            'l.nombre AS lugar_nombre',
            'h.id_x_subproducto AS hito_id',
            'h.nombre AS hito_nombre',
            'CAST(h.porcentaje_hito AS UNSIGNED) AS hito_porcentaje',
            'h.fecha_esperada AS hito_fecha_esperada',
            'e.id_x_hito AS entregable_id',
            'e.nombre AS entregable_nombre',
            'e.descripcion AS entregable_descripcion',
        ])
        .innerJoin('BPIN_subproductos', 'sp', 'sp.producto_id = p.id')
        .leftJoin('BPIN_productos_x_eje', 'bpxe', 'bpxe.producto_id = p.id')
        .leftJoin('GCF_ejes', 'ge', 'ge.id = bpxe.eje_id')
        .leftJoin('subproductos_lugares', 'sl', 'sl.subproducto_id = sp.id')
        .leftJoin('BPIN_lugares', 'l', 'l.id = sl.lugar_id')
        .leftJoin('BPIN_hitos', 'h', 'h.subproducto_id = sp.id')
        .leftJoin('BPIN_entregables', 'e', 'e.hito_id = h.id')
        .where('p.id = :productoId', { productoId: p_id })
        .andWhere('sp.id_x_producto = :subproductoId', { subproductoId: sp_id })
        .groupBy(`
            sp.id, sp.nombre, sp.que_se_hara, sp.metodologia, sp.como_se_reportara,
            p.id, p.nombre,
            l.id, l.nombre,
            h.id, h.id_x_subproducto, h.nombre, h.porcentaje_hito, h.fecha_esperada,
            e.id, e.nombre, e.descripcion
        `)
        .orderBy({
            'sp.id': 'ASC',
            'h.id': 'ASC',
            'e.id': 'ASC',
            'l.id': 'ASC',
        })
        .getRawMany();

    const subproductos = await this.subproductoRepository
    .createQueryBuilder('sp')
    .select([
        'sp.id_x_producto AS subproducto_id',
        `CONCAT('Subproducto ', ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY sp.id)) AS subproducto_index`,
        'sp.nombre'
    ])
    .innerJoin('BPIN_productos', 'p', 'p.id = sp.producto_id')
    .innerJoin('subprod_x_org_x_sistoperativo', 'spxosp', 'spxosp.subproducto_id = sp.id')
    .innerJoin('sistemaprod_x_organizacion', 'spxo', 'spxo.id = spxosp.org_x_sistprod_id')
    .where('spxo.organizacion_id = :orgId', { orgId: org.organizacionId })
    .andWhere('p.id = :productoId', { productoId: p_id })
    .getRawMany();

    if (data.length === 0) {
        throw new NotFoundException('No hay datos relacionados a la búsqueda');
      }
      
    const estructurado = this.estructurarProductos(data);
    return {
    subproductos: subproductos,
    hitosxsubproducto: estructurado,
    };

    }
    catch (error) {
      console.error('Error al obtener los subproductos por producto:', error);
      throw error;
    }
}

private estructurarProductos(data: any[]) {
  const mapa = new Map();

  for (const row of data) {
    // Producto
    if (!mapa.has(row.producto_id)) {
      mapa.set(row.producto_id, {
        id_producto: row.producto_id,
        nombre_producto: row.producto_nombre,
        ejes: row.ejes ? row.ejes.split(',').map(e => e.trim()) : [],
        subproductos: []
      });
    }
    const producto = mapa.get(row.producto_id);

    // Subproducto
    let subproducto = producto.subproductos.find(sp => sp.id_subproducto === row.subproducto_id);
    if (!subproducto) {
      subproducto = {
        id_subproducto: row.subproducto_id,
        nombre_subproducto: row.subproducto_nombre,
        que_se_hara: row.que_se_hara,
        metodologia: row.metodologia,
        como_se_reportara: row.como_se_reportara,
        lugares: [],
        hitos: []
      };
      producto.subproductos.push(subproducto);
    }

    // Lugar
    if (row.lugar_id && !subproducto.lugares.some(l => l.id_lugar === row.lugar_id)) {
      subproducto.lugares.push({
        id_lugar: row.lugar_id,
        nombre: row.lugar_nombre
      });
    }

    // Hito
    if (row.hito_id) {
      let hito = subproducto.hitos.find(h => h.id_hito === row.hito_id);
      if (!hito) {
        hito = {
          id_hito: row.hito_id,
          nombre_hito: row.hito_nombre,
          porcentaje: row.hito_porcentaje,
          fecha_esperada: row.hito_fecha_esperada ?? 'Aún no se ha añadido una fecha esperada para este hito',
          entregables: []
        };
        subproducto.hitos.push(hito);
      }

      // Entregable
      if (row.entregable_id && !hito.entregables.some(e => e.id === row.entregable_id)) {
        hito.entregables.push({
          id: row.entregable_id,
          nombre: row.entregable_nombre,
          descripcion: row.entregable_descripcion ?? 'Aún no se ha añadido una descripción para este entregable'
        });
      }
    }
  }

  return Array.from(mapa.values());
}
}
