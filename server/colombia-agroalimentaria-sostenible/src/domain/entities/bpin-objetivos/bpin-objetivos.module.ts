import { Module } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';
import { BpinObjetivosController } from './bpin-objetivos.controller';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';

@Module({
  controllers: [BpinObjetivosController],
  providers: [BpinObjetivosService, BpinObjetivoRepository],
  exports: [BpinObjetivosService],
})
export class BpinObjetivosModule {}
