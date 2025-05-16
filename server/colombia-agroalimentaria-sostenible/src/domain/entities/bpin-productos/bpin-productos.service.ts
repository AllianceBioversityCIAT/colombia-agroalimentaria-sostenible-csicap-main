import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BpinProducto } from './entities/bpin-producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BpinSubproducto } from '../bpin-subproducto/entities/bpin-subproducto.entity';

@Injectable()
export class BpinProductosService {
constructor(
  @InjectRepository(BpinProducto)
  private readonly productoRepository: Repository<BpinProducto>,
) {}

  async obtenerIdYNombres(): Promise<{ id: number; resumen: string; nombre: string }[]> {
    const producto = await this.productoRepository.find({
      select: ['id', 'nombre'],
    });


    return (await producto).map((producto) => ({
      id: producto.id,
      resumen: `Producto ${producto.id}`,
      nombre: producto.nombre,
    })
    );
  }

}
