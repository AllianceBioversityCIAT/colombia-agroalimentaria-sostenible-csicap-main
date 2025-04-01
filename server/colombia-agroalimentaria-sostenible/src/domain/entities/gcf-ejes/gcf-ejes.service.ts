import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GcfEje } from './entities/gcf-eje.entity';
import { dataSource } from '../../../db/config/mysql/orm.config';

@Injectable()
export class GcfEjesService {
    private readonly ejeRepository: Repository<GcfEje>;
    constructor(private readonly dataSource: DataSource) {
        this.ejeRepository = dataSource.getRepository(GcfEje);
    }

    async findEjes() {
        return this.ejeRepository
            .createQueryBuilder('eje')
            .select([
                'eje.id',
                'eje.nombre',
            ])
            .getMany();
    }
}
