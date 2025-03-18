import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinActividade } from '../../bpin-actividades/entities/bpin-actividade.entity';

@Entity('BPIN_objetivos')
export class BpinObjetivo extends AuditableEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'nombre', type: 'text' })
  nombre: string;

  @OneToMany(
    () => BpinActividade,
    (bpinActividade) => bpinActividade.bpinObjetivo,
  )
  bpinActividades: BpinActividade[];
}
