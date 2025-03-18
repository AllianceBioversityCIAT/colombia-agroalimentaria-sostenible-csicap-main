import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinProducto } from '../../bpin-productos/entities/bpin-producto.entity';

@Entity('BPIN_responsables')
export class BpinResponsable extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'BPIN_producto_id',
    type: 'bigint',
  })
  BPIN_producto_id: number;

  @Column({
    name: 'persona_id',
    type: 'bigint',
  })
  persona_id: number;

  @ManyToOne(
    () => BpinProducto,
    (bpinProducto) => bpinProducto.bpinResponsables,
  )
  @JoinColumn({ name: 'BPIN_producto_id' })
  bpinProducto: BpinProducto;
}
