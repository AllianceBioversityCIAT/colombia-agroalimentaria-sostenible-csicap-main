import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { SistemaprodOrg } from '../../sistemaprod-org/entities/sistemaprod-org.entity';

@Entity('sistemas_productivos')
export class SistemasProductivo extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre?: string;

  @OneToMany(() => SistemaprodOrg, (sistemaprodOrg) => sistemaprodOrg.sistprod)
  sistemaprodOrg: SistemaprodOrg[];
}