import { Controller } from '@nestjs/common';
import { GcfComponentesService } from './gcf-componentes.service';

@Controller('gcf-componentes')
export class GcfComponentesController {
  constructor(private readonly gcfComponentesService: GcfComponentesService) {}
}
