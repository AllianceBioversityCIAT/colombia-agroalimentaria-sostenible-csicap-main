import { Controller } from '@nestjs/common';
import { GcfSubactividadesService } from './gcf-subactividades.service';

@Controller('gcf-subactividades')
export class GcfSubactividadesController {
  constructor(
    private readonly gcfSubactividadesService: GcfSubactividadesService,
  ) {}
}
