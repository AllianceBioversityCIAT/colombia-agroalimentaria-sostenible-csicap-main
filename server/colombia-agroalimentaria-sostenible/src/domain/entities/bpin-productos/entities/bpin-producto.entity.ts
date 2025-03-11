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
import { BpinSubActividade } from '../../bpin-sub-actividades/entities/bpin-sub-actividade.entity';
import { BpinResponsable } from '../../bpin-responsables/entities/bpin-responsable.entity';

@Entity('BPIN_productos')
export class BpinProducto extends AuditableEntity {
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
    name: 'descripcion_alcance',
    type: 'text',
    nullable: true,
  })
  descripcion_alcance: string;

  @Column({
    name: 'fecha_entrega',
    type: 'date',
    nullable: true,
  })
  fecha_entrega: string;

  @Column({
    name: 'BPIN_subactividades_id',
    type: 'bigint',
    nullable: true,
  })
  BPIN_subactividades_id: number;

  @Column({
    name: 'GCF_ejes_codigo',
    type: 'bigint',
    nullable: true,
  })
  GCF_ejes_codigo: number;

  @ManyToOne(() => GcfEje, (gcfEje) => gcfEje.bpinProductos)
  @JoinColumn({ name: 'GCF_ejes_codigo' })
  gcfEje: GcfEje;

  @ManyToOne(() => BpinSubActividade, (gcfEje) => gcfEje.bpinProductos)
  @JoinColumn({ name: 'BPIN_subactividades_id' })
  bpinSubActividade: BpinSubActividade;

  @OneToMany(
    () => BpinResponsable,
    (bpinResponsable) => bpinResponsable.bpinProducto,
  )
  bpinResponsables: BpinResponsable[];
}
