import { Module } from '@nestjs/common';
import { BpinHitosService } from './bpin-hitos.service';
import { BpinHitosController } from './bpin-hitos.controller';

@Module({
  controllers: [BpinHitosController],
  providers: [BpinHitosService],
})
export class BpinHitosModule {}
