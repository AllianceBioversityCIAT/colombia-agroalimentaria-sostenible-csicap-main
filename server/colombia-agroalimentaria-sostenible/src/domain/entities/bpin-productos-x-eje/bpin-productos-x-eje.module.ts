import { Module } from '@nestjs/common';
import { BpinProductosXEjeService } from './bpin-productos-x-eje.service';
import { BpinProductosXEjeController } from './bpin-productos-x-eje.controller';

@Module({
  controllers: [BpinProductosXEjeController],
  providers: [BpinProductosXEjeService],
})
export class BpinProductosXEjeModule {}
