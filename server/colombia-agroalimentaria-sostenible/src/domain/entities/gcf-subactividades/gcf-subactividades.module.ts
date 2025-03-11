import { Module } from '@nestjs/common';
import { GcfSubactividadesService } from './gcf-subactividades.service';
import { GcfSubactividadesController } from './gcf-subactividades.controller';

@Module({
  controllers: [GcfSubactividadesController],
  providers: [GcfSubactividadesService],
})
export class GcfSubactividadesModule {}
