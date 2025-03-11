import { Module } from '@nestjs/common';
import { GcfEjesService } from './gcf-ejes.service';
import { GcfEjesController } from './gcf-ejes.controller';

@Module({
  controllers: [GcfEjesController],
  providers: [GcfEjesService],
})
export class GcfEjesModule {}
