import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { SistemasProductivo } from '../../sistemas-productivos/entities/sistemas-productivo.entity';
import { SubprodXOrgXSistoperativo } from '../../subprod-x-org-x-sistoperativo/entities/subprod-x-org-x-sistoperativo.entity';

@Entity('sistemaprod_x_organizacion')
export class SistemaprodOrg extends AuditableEntity{
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    id: number;

    @Column({
        name: 'organizacion_id',
        type: 'bigint',
    })
    persona_id: number;

    @Column({
        name: 'sistema_productivo_id',
        type: 'bigint',
    })
    sistema_productivo_id: number;

    @ManyToOne(() => SistemasProductivo, (sistprod) => sistprod.sistemaprodOrg)
    @JoinColumn({ name: 'sistema_productivo_id' })
    sistprod: SistemasProductivo;

    @OneToMany(() => SubprodXOrgXSistoperativo, (subprodXOrgXSistoperativo) => subprodXOrgXSistoperativo.sistemaprodOrg)
    subprodXOrgXSistoperativo: SubprodXOrgXSistoperativo[];

}
