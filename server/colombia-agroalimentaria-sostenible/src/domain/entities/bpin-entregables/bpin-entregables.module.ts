import { Module } from '@nestjs/common';
import { BpinEntregablesService } from './bpin-entregables.service';
import { BpinEntregablesController } from './bpin-entregables.controller';

@Module({
  controllers: [BpinEntregablesController],
  providers: [BpinEntregablesService],
})
export class BpinEntregablesModule {}
