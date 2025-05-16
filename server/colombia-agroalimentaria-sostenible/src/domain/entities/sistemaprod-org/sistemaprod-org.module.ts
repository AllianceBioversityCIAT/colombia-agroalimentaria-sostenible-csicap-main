import { Module } from '@nestjs/common';
import { SistemaprodOrgService } from './sistemaprod-org.service';
import { SistemaprodOrgController } from './sistemaprod-org.controller';

@Module({
  controllers: [SistemaprodOrgController],
  providers: [SistemaprodOrgService],
})
export class SistemaprodOrgModule {}
