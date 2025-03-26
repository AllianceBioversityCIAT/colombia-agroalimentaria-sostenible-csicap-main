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
    length: 45,
    nullable: true,
  })
  codigo: string;

  @Column({
    name: 'periodo',
    type: 'int',
    nullable: true,
  })
  periodo: number;

  @Column({
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre: string;

  @Column({
    name: 'presupuesto',
    type: 'float',
    nullable: true,
  })
  presupuesto: number;

  @Column({
    name: 'BPIN_actividades_id',
    type: 'bigint',
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
