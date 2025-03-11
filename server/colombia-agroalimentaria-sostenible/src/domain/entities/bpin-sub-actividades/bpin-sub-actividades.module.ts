import { Module } from '@nestjs/common';
import { BpinSubActividadesService } from './bpin-sub-actividades.service';
import { BpinSubActividadesController } from './bpin-sub-actividades.controller';

@Module({
  controllers: [BpinSubActividadesController],
  providers: [BpinSubActividadesService],
})
export class BpinSubActividadesModule {}
