import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BpinObjetivo } from '../../bpin-objetivos/entities/bpin-objetivo.entity';
import { BpinSubActividade } from '../../bpin-sub-actividades/entities/bpin-sub-actividade.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('BPIN_actividades')
export class BpinActividade extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'codigo',
    type: 'bigint',
    nullable: true,
  })
  codigo: number;

  @Column({
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre: string;

  @Column({
    name: 'BPIN_objetivos_codigo',
    type: 'bigint',
    nullable: true,
  })
  BPIN_objetivos_codigo: number;

  @ManyToOne(() => BpinObjetivo, (bpinObjetivo) => bpinObjetivo.bpinActividades)
  @JoinColumn({ name: 'BPIN_objetivos_codigo' })
  bpinObjetivo: BpinObjetivo;

  @OneToMany(
    () => BpinSubActividade,
    (bpinSubActividade) => bpinSubActividade.bpinActividade,
  )
  bpinSubActividades: BpinSubActividade[];
}
