import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { BpinProducto as Producto } from '../../bpin-productos/entities/bpin-producto.entity';
  import { LugarSubproducto } from '../../lugar-subproducto/entities/lugar-subproducto.entity';
  import { BpinHito as Hito} from '../../bpin-hitos/entities/bpin-hito.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { SubprodXOrgXSistoperativo } from '../../subprod-x-org-x-sistoperativo/entities/subprod-x-org-x-sistoperativo.entity';
  
  @Entity('BPIN_subproductos')
  export class BpinSubproducto extends AuditableEntity{
    @PrimaryGeneratedColumn({
      name: 'id',
      type: 'bigint',
    })
    id: number;

    @Column({ 
      name: 'id_x_producto', 
      type: 'bigint',
      nullable: true, 
    })
    id_x_producto: number;
  
    @Column({ 
      name: 'nombre', 
      type: 'text',
      nullable: true, 
    })
    nombre: string;
  
    @Column({ 
      name: 'que_se_hara', 
      type: 'text',
      nullable: true,
    })
    queSeHara: string;
  
    @Column({ 
      name: 'metodologia',
      type: 'text',
      nullable: true,
    })
    metodologia: string;
  
    @Column({ 
      name: 'como_se_reportara', 
      type: 'text',
      nullable: true,
    })
    comoSeReportara: string;

    @Column({
      name: 'producto_id',
      type: 'bigint',
    })
    producto_id: number;
  
    @ManyToOne(() => Producto, (producto) => producto.subproductos)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    @OneToMany(() => SubprodXOrgXSistoperativo, (subprodXOrgXSistoperativo) => subprodXOrgXSistoperativo.subproducto)
    subprodXOrgXSistoperativo: SubprodXOrgXSistoperativo[];
  
    @OneToMany(() => LugarSubproducto, (sl) => sl.subproducto)
    subproductoLugares: LugarSubproducto[];
  
    @OneToMany(() => Hito, (hito) => hito.subproducto)
    hitos: Hito[];
  }
