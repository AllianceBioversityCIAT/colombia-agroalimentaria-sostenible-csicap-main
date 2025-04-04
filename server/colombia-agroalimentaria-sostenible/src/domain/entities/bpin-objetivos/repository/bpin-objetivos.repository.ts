import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BpinObjetivo } from '../entities/bpin-objetivo.entity';

@Injectable()
export class BpinObjetivoRepository extends Repository<BpinObjetivo> {
  constructor(private readonly dataSource: DataSource) {
    super(BpinObjetivo, dataSource.createEntityManager());
  }
}
