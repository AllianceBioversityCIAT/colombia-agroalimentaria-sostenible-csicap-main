import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { LugarSubproducto } from '../../lugar-subproducto/entities/lugar-subproducto.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('BPIN_lugares')
export class BpinLugar extends AuditableEntity{
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

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

  @OneToMany(() => LugarSubproducto, (sl) => sl.lugar)
  subproductoLugares: LugarSubproducto[];
}
