import { Module } from '@nestjs/common';
import { BpinResponsablesService } from './bpin-responsables.service';
import { BpinResponsablesController } from './bpin-responsables.controller';

@Module({
  controllers: [BpinResponsablesController],
  providers: [BpinResponsablesService],
})
export class BpinResponsablesModule {}
