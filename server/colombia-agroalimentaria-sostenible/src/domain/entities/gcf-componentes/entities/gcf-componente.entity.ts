import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { GcfEje } from '../../gcf-ejes/entities/gcf-eje.entity';

@Entity('GCF_componentes')
export class GcfComponente extends AuditableEntity {
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

  @OneToMany(() => GcfEje, (gcfEje) => gcfEje.gcfComponente)
  gcfEjes: GcfEje[];
}
