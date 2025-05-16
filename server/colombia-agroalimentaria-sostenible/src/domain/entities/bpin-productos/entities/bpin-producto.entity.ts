import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinSubActividade } from '../../bpin-sub-actividades/entities/bpin-sub-actividade.entity';
import { BpinResponsable } from '../../bpin-responsables/entities/bpin-responsable.entity';
import { BpinProductosXEje } from '../../bpin-productos-x-eje/entities/bpin-productos-x-eje.entity';
import { BpinSubproducto as Subproducto } from '../../bpin-subproducto/entities/bpin-subproducto.entity';

@Entity('BPIN_productos')
export class BpinProducto extends AuditableEntity {
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
  })
  BPIN_subactividades_id: number;

  @ManyToOne(() => BpinSubActividade, (gcfEje) => gcfEje.bpinProductos)
  @JoinColumn({ name: 'BPIN_subactividades_id' })
  bpinSubActividade: BpinSubActividade;

  @OneToMany(
    () => BpinResponsable,
    (bpinResponsable) => bpinResponsable.bpinProducto,
  )
  bpinResponsables: BpinResponsable[];

  @OneToMany(
    () => BpinProductosXEje,
    (bpinProductosXEje) => bpinProductosXEje.producto,
  )
  bpinProductosXEje: BpinProductosXEje[];

  @OneToMany(
    () => Subproducto, 
    (subproducto) => subproducto.producto,
  )
  subproductos: Subproducto[];
}
