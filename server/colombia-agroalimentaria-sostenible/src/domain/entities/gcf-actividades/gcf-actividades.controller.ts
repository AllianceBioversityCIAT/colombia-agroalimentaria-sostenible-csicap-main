import { Controller } from '@nestjs/common';
import { GcfActividadesService } from './gcf-actividades.service';

@Controller('gcf-actividades')
export class GcfActividadesController {
  constructor(private readonly gcfActividadesService: GcfActividadesService) {}
}
