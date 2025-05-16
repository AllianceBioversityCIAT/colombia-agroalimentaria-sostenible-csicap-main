import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BpinHito as Hito } from '../../bpin-hitos/entities/bpin-hito.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('BPIN_entregables')
export class BpinEntregable extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'hito_id',
    type: 'bigint',
  })
  hito_id: number;

  @Column({
    name: 'id_x_hito',
    type: 'bigint',
  })
  id_x_hito: number;

  @Column({
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre: string;

  @Column({
    name: 'descripcion',
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @ManyToOne(() => Hito, (hito) => hito.entregables)
  @JoinColumn({ name: 'hito_id' })
  hito: Hito;
}
