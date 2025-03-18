import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { BpinProducto } from "../../bpin-productos/entities/bpin-producto.entity";
import { GcfEje } from "../../gcf-ejes/entities/gcf-eje.entity";

@Entity("BPIN_productos_x_eje")
export class BpinProductosXEje extends AuditableEntity{

    @PrimaryColumn({
        name: 'eje_id',
        type: 'bigint',
    })
    eje_id: number;

    @PrimaryColumn({
        name: 'producto_id',
        type: 'bigint',
    })
    producto_id: number;

    @ManyToOne(() => BpinProducto, (producto) => producto.bpinProductosXEje)
    @JoinColumn({ name: 'producto_id' })
    producto: BpinProducto;

    @ManyToOne(() => GcfEje, (eje) => eje.bpinProductosXEje)
    @JoinColumn({ name: 'eje_id' })
    gcfEje: GcfEje;

}
