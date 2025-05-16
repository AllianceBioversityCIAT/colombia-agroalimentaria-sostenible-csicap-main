import { Module } from '@nestjs/common';
import { BpinSubproductoService } from './bpin-subproducto.service';
import { BpinSubproductoController } from './bpin-subproducto.controller';

@Module({
  controllers: [BpinSubproductoController],
  providers: [BpinSubproductoService],
})
export class BpinSubproductoModule {}
