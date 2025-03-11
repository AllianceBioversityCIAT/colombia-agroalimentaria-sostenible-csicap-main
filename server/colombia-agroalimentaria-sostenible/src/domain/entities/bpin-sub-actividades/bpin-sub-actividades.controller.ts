import { Controller } from '@nestjs/common';
import { BpinSubActividadesService } from './bpin-sub-actividades.service';

@Controller('bpin-sub-actividades')
export class BpinSubActividadesController {
  constructor(
    private readonly bpinSubActividadesService: BpinSubActividadesService,
  ) {}
}
