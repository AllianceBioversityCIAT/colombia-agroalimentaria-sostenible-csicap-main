import { Module } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';
import { BpinObjetivosController } from './bpin-objetivos.controller';

@Module({
  controllers: [BpinObjetivosController],
  providers: [BpinObjetivosService],
})
export class BpinObjetivosModule {}
