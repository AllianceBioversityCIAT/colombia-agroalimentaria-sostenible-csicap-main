import { Module } from '@nestjs/common';
import { GcfComponentesService } from './gcf-componentes.service';
import { GcfComponentesController } from './gcf-componentes.controller';

@Module({
  controllers: [GcfComponentesController],
  providers: [GcfComponentesService],
})
export class GcfComponentesModule {}
