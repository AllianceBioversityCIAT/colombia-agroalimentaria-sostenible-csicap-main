import { Module } from '@nestjs/common';
import { BpinProductosService } from './bpin-productos.service';
import { BpinProductosController } from './bpin-productos.controller';

@Module({
  controllers: [BpinProductosController],
  providers: [BpinProductosService],
})
export class BpinProductosModule {}
