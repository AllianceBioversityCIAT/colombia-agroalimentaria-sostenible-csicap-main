import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../shared/global-dto/auditable.entity';

@Entity('personas')
export class Persona extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'nombre',
    nullable: true,
  })
  nombre?: string;

  @Column({
    type: 'text',
    name: 'apellido',
    nullable: true,
  })
  apellido?: string;

  @Column({
    type: 'text',
    name: 'email',
  })
  email: string;
}
