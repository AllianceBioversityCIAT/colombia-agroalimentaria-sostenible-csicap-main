import { Module } from '@nestjs/common';
import { GcfActividadesService } from './gcf-actividades.service';
import { GcfActividadesController } from './gcf-actividades.controller';

@Module({
  controllers: [GcfActividadesController],
  providers: [GcfActividadesService],
})
export class GcfActividadesModule {}
