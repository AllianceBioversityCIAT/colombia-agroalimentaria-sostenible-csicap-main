import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { GcfEje } from '../../gcf-ejes/entities/gcf-eje.entity';
import { GcfSubactividade } from '../../gcf-subactividades/entities/gcf-subactividade.entity';

@Entity('GCF_actividades')
export class GcfActividade extends AuditableEntity {
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
    name: 'nombre',
    type: 'text',
    nullable: true,
  })
  nombre: string;

  @Column({
    name: 'GCF_ejes_codigo',
    type: 'bigint',
  })
  GCF_ejes_codigo: number;

  @ManyToOne(() => GcfEje, (gcfEje) => gcfEje.gcfActividades)
  @JoinColumn({ name: 'GCF_ejes_codigo' })
  gcfEje: GcfEje;

  @OneToMany(
    () => GcfSubactividade,
    (gcfSubactividade) => gcfSubactividade.gcfActividade,
  )
  gcfSubactividades: GcfSubactividade[];
}
