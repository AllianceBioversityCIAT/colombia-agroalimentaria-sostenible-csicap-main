import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum TipoUsuario {
    SOCIO = 'SOCIO',
    COORDINADOR = 'COORDINADOR',
    ADMINISTRADOR = 'ADMINISTRADOR',
}
  
@Entity('fechas_corte')
export class FechasCorte extends AuditableEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    id: number;

    @Column({ 
        name: 'fecha_inicio',
        type: 'date',
        nullable: true, 
    })
    fechaInicio: Date;
  
    @Column({ 
        name: 'fecha_fin',
        type: 'date',
        nullable: true,
    })
    fechaFin: Date;
  
    @Column({ 
        name: 'tipo_usuario',
        type: 'enum',
        nullable: true, 
        enum: TipoUsuario, 
    })
    tipoUsuario: TipoUsuario;
}

