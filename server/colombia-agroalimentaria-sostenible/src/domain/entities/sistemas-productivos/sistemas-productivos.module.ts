import { Module } from '@nestjs/common';
import { SistemasProductivosService } from './sistemas-productivos.service';
import { SistemasProductivosController } from './sistemas-productivos.controller';

@Module({
  controllers: [SistemasProductivosController],
  providers: [SistemasProductivosService],
})
export class SistemasProductivosModule {}
