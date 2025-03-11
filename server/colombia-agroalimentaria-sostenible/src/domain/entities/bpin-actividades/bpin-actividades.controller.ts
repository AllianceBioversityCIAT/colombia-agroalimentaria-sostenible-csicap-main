import { Controller } from '@nestjs/common';
import { BpinActividadesService } from './bpin-actividades.service';

@Controller('bpin-actividades')
export class BpinActividadesController {
  constructor(
    private readonly bpinActividadesService: BpinActividadesService,
  ) {}
}
