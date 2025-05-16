import { Module } from '@nestjs/common';
import { BpinLugarService } from './bpin-lugar.service';
import { BpinLugarController } from './bpin-lugar.controller';

@Module({
  controllers: [BpinLugarController],
  providers: [BpinLugarService],
})
export class BpinLugarModule {}
