import { Controller } from '@nestjs/common';
import { GcfEjesService } from './gcf-ejes.service';

@Controller('gcf-ejes')
export class GcfEjesController {
  constructor(private readonly gcfEjesService: GcfEjesService) {}
}
