import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { GcfActividade } from '../../gcf-actividades/entities/gcf-actividade.entity';

@Entity('GCF_subactividades')
export class GcfSubactividade extends AuditableEntity {
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

  @Column({
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre: string;

  @Column({
    name: 'GCF_actividades_id',
    type: 'bigint',
    nullable: true,
  })
  GCF_actividades_id: number;

  @ManyToOne(
    () => GcfActividade,
    (gcfActividade) => gcfActividade.gcfSubactividades,
  )
  @JoinColumn({ name: 'GCF_actividades_id' })
  gcfActividade: GcfActividade;
}
