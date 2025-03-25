import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BpinObjetivo } from './entities/bpin-objetivo.entity';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';

@Injectable()
export class BpinObjetivosService {
  constructor(private readonly mainRepo: BpinObjetivoRepository) {}

  async findFichaBPIN(): Promise<BpinObjetivo[]> {
    return this.mainRepo.find({
      where: {
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
}
