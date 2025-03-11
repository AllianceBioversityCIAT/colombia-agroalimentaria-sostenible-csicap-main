import { Controller } from '@nestjs/common';
import { BpinResponsablesService } from './bpin-responsables.service';

@Controller('bpin-responsables')
export class BpinResponsablesController {
  constructor(
    private readonly bpinResponsablesService: BpinResponsablesService,
  ) {}
}
