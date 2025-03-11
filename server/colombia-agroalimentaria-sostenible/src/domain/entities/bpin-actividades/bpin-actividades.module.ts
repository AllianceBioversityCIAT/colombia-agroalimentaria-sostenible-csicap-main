import { Module } from '@nestjs/common';
import { BpinActividadesService } from './bpin-actividades.service';
import { BpinActividadesController } from './bpin-actividades.controller';

@Module({
  controllers: [BpinActividadesController],
  providers: [BpinActividadesService],
})
export class BpinActividadesModule {}
