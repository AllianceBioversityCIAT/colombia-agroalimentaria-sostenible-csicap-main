import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BpinActividade } from '../../bpin-actividades/entities/bpin-actividade.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinProducto } from '../../bpin-productos/entities/bpin-producto.entity';

@Entity('BPIN_sub_actividades')
export class BpinSubActividade extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'codigo',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  codigo: string;

  //TODO: Check if the special character is needed 'ñ' in the name column
  @Column({
    name: 'año',
    type: 'bigint',
    nullable: true,
  })
  año: number;

  @Column({
    name: 'sub_actividad',
    type: 'text',
    nullable: true,
  })
  sub_actividad: string;

  @Column({
    name: 'presupuesto',
    type: 'float',
    nullable: true,
  })
  presupuesto: number;

  @Column({
    name: 'BPIN_actividades_id',
    type: 'bigint',
    nullable: true,
  })
  BPIN_actividades_id: number;

  @ManyToOne(
    () => BpinActividade,
    (bpinActividade) => bpinActividade.bpinSubActividades,
  )
  @JoinColumn({ name: 'BPIN_actividades_id' })
  bpinActividade: BpinActividade;

  @OneToMany(
    () => BpinProducto,
    (bpinProducto) => bpinProducto.bpinSubActividade,
  )
  bpinProductos: BpinProducto[];
}
