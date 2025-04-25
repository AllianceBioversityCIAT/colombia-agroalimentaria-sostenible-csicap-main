import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getEjesByRoles(roleId: string) {

        const roleIds = roleId.split(',').map(id => Number(id.trim()));
        if (roleIds.some(id => isNaN(id))) {
            throw new BadRequestException('Todos los valores en roleIds deben ser numéricos.');
        }
    
        const roles = await this.dataSource.query(
          `SELECT id, nombre FROM roles WHERE id IN (${roleIds.join(',')})`
        );

        console.log('Roles enviados:', roles);
    
        if (roles.length !== roleIds.length) {
          throw new NotFoundException('Uno o más roles no existen.');
        }
    
        const rolMuestraEjes  = [2, 4, 5];
    
        const puedeVerEjes = roleIds.some(id =>
            rolMuestraEjes.includes(id),
          );
    
        if (!puedeVerEjes) {
          return [];
        }

        return this.ejeRepository.find({
          select: ['id', 'nombre'],
        });
    }
    
}
