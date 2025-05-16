import { Module } from '@nestjs/common';
import { BpinProductosService } from './bpin-productos.service';
import { BpinProductosController } from './bpin-productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BpinProducto } from './entities/bpin-producto.entity';

@Module({
  controllers: [BpinProductosController],
  imports: [
    TypeOrmModule.forFeature([BpinProducto])  // <--- Aquí debes importar el repositorio
  ],
  providers: [BpinProductosService],
})
export class BpinProductosModule {}
