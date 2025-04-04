import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GcfComponente } from './entities/gcf-componente.entity';

@Injectable()
export class GcfComponentesService {
  private readonly mainRepo: Repository<GcfComponente>;
  constructor(dataSource: DataSource) {
    this.mainRepo = dataSource.getRepository(GcfComponente);
  }

  async findAll() {
    return this.mainRepo.find({
      where: {
        is_active: true,
      },
      relations: {
        gcfEjes: true,
      },
    });
  }
}
