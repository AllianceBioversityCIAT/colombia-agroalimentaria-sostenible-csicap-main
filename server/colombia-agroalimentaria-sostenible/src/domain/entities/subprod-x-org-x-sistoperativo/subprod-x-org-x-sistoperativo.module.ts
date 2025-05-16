import { Module } from '@nestjs/common';
import { SubprodXOrgXSistoperativoService } from './subprod-x-org-x-sistoperativo.service';
import { SubprodXOrgXSistoperativoController } from './subprod-x-org-x-sistoperativo.controller';

@Module({
  controllers: [SubprodXOrgXSistoperativoController],
  providers: [SubprodXOrgXSistoperativoService],
})
export class SubprodXOrgXSistoperativoModule {}
