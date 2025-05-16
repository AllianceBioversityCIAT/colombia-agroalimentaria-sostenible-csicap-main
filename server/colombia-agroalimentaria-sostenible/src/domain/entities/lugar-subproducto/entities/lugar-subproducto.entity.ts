import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { BpinSubproducto as Subproducto } from '../../bpin-subproducto/entities/bpin-subproducto.entity';
import { BpinLugar as Lugar} from '../../bpin-lugar/entities/bpin-lugar.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('subproductos_lugares')
export class LugarSubproducto extends AuditableEntity{
  @PrimaryColumn({
    name: 'subproducto_id',
    type: 'bigint',
  })
  subproducto_id: number;

  @PrimaryColumn({
    name: 'lugar_id',
    type: 'bigint',
  })
  lugar_id: number;

  @ManyToOne(() => Subproducto, (subproducto) => subproducto.subproductoLugares)
  @JoinColumn({ name: 'subproducto_id' })
  subproducto: Subproducto;

  @ManyToOne(() => Lugar, (lugar) => lugar.subproductoLugares)
  @JoinColumn({ name: 'lugar_id' })
  lugar: Lugar;
}
