import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BpinObjetivo } from './entities/bpin-objetivo.entity';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';
import { FilterBpinObjetivosDto } from './dto/filter-bpin-objetivos.dto';

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

  async planOperativoCIAT(){
    return this.mainRepo
    .createQueryBuilder('objetivo')
    .select([
      "objetivo.id AS id",
      "objetivo.nombre AS nombre",
      "actividad.id AS actividad_id",
      "CONCAT(actividad.codigo, '. ', actividad.nombre) AS actividad",
      "subactividad.id AS subactividad_id",
      "CONCAT(subactividad.codigo, '. ', subactividad.nombre) AS subactividad",
      "subactividad.presupuesto AS presupuesto",
      "producto.id AS producto_id",
      "producto.nombre AS producto",
      "producto.descripcion_alcance AS descripcion",
      "producto.fecha_entrega AS fecha_entrega",
      "GROUP_CONCAT(DISTINCT ejes.nombre ORDER BY ejes.nombre SEPARATOR ', ') AS ejes",
      "GROUP_CONCAT(DISTINCT responsable.persona_id ORDER BY responsable.persona_id SEPARATOR ', ') AS responsables"
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
}
