import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BpinActividade } from './entities/bpin-actividade.entity';

@Injectable()
export class BpinActividadesService {
 private readonly actividadRepository: Repository<BpinActividade>;
  constructor(private readonly dataSource: DataSource) {
    this.actividadRepository = dataSource.getRepository(BpinActividade);
  }

  async obtenerIdYNombres(): Promise<{ id: number; resumen: string; nombre: string }[]>  {
    const actividades = await this.actividadRepository.find({
      select: ['id', 'codigo', 'nombre'],
    });

    return actividades.map((actividad) => ({
    id: actividad.id,
    resumen: `Actividad ${actividad.codigo}`,
    nombre: actividad.nombre,
    })
    );
  }
}

