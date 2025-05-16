import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BpinSubproducto as Subproducto } from '../../bpin-subproducto/entities/bpin-subproducto.entity';
import { BpinEntregable as Entregable } from '../../bpin-entregables/entities/bpin-entregable.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('BPIN_hitos')
export class BpinHito extends AuditableEntity {
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
    name: 'id_x_subproducto',
    type: 'bigint',
  })
  id_x_subproducto: number;

  @Column({
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre: string;

  @Column({ 
    name: 'porcentaje_hito', 
    type: 'decimal', 
    precision: 5, 
    scale: 2,
    nullable: true,
  })
  porcentajeHito: number;

  @Column({ 
    name: 'fecha_esperada', 
    type: 'date',
    nullable: true,
  })
  fechaEsperada: Date;

  @ManyToOne(() => Subproducto, (subproducto) => subproducto.hitos)
  @JoinColumn({ name: 'subproducto_id' })
  subproducto: Subproducto;

  @OneToMany(() => Entregable, (entregable) => entregable.hito)
  entregables: Entregable[];
}