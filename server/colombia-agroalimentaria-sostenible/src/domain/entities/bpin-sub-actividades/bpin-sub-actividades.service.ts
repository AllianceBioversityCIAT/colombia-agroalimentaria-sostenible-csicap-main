import { Injectable } from '@nestjs/common';
import { BpinSubActividade } from './entities/bpin-sub-actividade.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BpinSubActividadesService {
 private readonly subactividadRepository: Repository<BpinSubActividade>;
  constructor(private readonly dataSource: DataSource) {
    this.subactividadRepository = dataSource.getRepository(BpinSubActividade);
  }

  async obtenerIdYNombres(): Promise<{ id: number; resumen: string; nombre: string }[]>{
    const subactividad = await this.subactividadRepository.find({
      select: ['id', 'codigo', 'nombre'],
    });

    return subactividad.map((subactividad) => ({
      id: subactividad.id,
      resumen: `Subactividad ${subactividad.codigo}`,
      nombre: subactividad.nombre,
    })
    );
  }
}
