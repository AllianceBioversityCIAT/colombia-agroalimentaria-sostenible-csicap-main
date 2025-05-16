import { Module } from '@nestjs/common';
import { BpinSubproductoService } from './bpin-subproducto.service';
import { BpinSubproductoController } from './bpin-subproducto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BpinSubproducto } from './entities/bpin-subproducto.entity';

@Module({
  controllers: [BpinSubproductoController],
  imports: [TypeOrmModule.forFeature([BpinSubproducto])],
  providers: [BpinSubproductoService],
})
export class BpinSubproductoModule {}
