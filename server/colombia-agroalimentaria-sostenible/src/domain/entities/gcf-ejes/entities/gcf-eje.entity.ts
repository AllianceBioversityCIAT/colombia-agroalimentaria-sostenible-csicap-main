import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GcfComponente } from '../../gcf-componentes/entities/gcf-componente.entity';
import { GcfActividade } from '../../gcf-actividades/entities/gcf-actividade.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinProducto } from '../../bpin-productos/entities/bpin-producto.entity';

@Entity('GCF_ejes')
export class GcfEje extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'codigo',
    type: 'bigint',
  })
  codigo: number;

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

  @Column({
    name: 'GCF_componentes_codigo',
    type: 'bigint',
    nullable: true,
  })
  GCF_componentes_codigo: number;

  @ManyToOne(() => GcfComponente, (gcfComponente) => gcfComponente.gcfEjes)
  @JoinColumn({ name: 'GCF_componentes_codigo' })
  gcfComponente: GcfComponente;

  @OneToMany(() => GcfActividade, (gcfActividade) => gcfActividade.gcfEje)
  gcfActividades: GcfActividade[];

  @OneToMany(() => BpinProducto, (bpinProducto) => bpinProducto.gcfEje)
  bpinProductos: BpinProducto[];
}
