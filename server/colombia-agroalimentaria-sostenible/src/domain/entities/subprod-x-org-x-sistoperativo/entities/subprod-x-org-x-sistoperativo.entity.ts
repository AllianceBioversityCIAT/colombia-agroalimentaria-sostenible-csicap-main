import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinSubproducto as Subproducto  } from '../../bpin-subproducto/entities/bpin-subproducto.entity';
import { SistemaprodOrg } from '../../sistemaprod-org/entities/sistemaprod-org.entity';


@Entity('subprod_x_org_x_sistoperativo')
export class SubprodXOrgXSistoperativo extends AuditableEntity{
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    id: number;

    @Column({
        name: 'subproducto_id',
        type: 'bigint',
    })
    subproducto_id: number;

    @Column({
        name: 'org_x_sistprod_id',
        type: 'bigint',
    })
    org_x_sistprod_id: number;

    @ManyToOne(() => Subproducto, (subproducto) => subproducto.subprodXOrgXSistoperativo)
    @JoinColumn({ name: 'subproducto_id' })
    subproducto: Subproducto;

    @ManyToOne(() => SistemaprodOrg, (sistemaprodOrg) => sistemaprodOrg.subprodXOrgXSistoperativo)
    @JoinColumn({ name: 'org_x_sistprod_id' })
    sistemaprodOrg: SistemaprodOrg;

}
