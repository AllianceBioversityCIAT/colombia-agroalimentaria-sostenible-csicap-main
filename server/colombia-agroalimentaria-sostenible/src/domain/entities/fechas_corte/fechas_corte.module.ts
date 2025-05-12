import { Module } from '@nestjs/common';
import { FechasCorteService } from './fechas_corte.service';
import { FechasCorteController } from './fechas_corte.controller';

@Module({
  controllers: [FechasCorteController],
  providers: [FechasCorteService],
})
export class FechasCorteModule {}
