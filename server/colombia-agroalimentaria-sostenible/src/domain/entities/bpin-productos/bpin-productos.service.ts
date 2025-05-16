import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BpinProducto } from './entities/bpin-producto.entity';

@Injectable()
export class BpinProductosService {
 private readonly productoRepository: Repository<BpinProducto>;
  constructor(private readonly dataSource: DataSource) {
    this.productoRepository = dataSource.getRepository(BpinProducto);
  }

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
