import { Module } from '@nestjs/common';
import { LugarSubproductoService } from './lugar-subproducto.service';
import { LugarSubproductoController } from './lugar-subproducto.controller';

@Module({
  controllers: [LugarSubproductoController],
  providers: [LugarSubproductoService],
})
export class LugarSubproductoModule {}
