import { Controller } from '@nestjs/common';
import { BpinProductosService } from './bpin-productos.service';

@Controller('bpin-productos')
export class BpinProductosController {
  constructor(private readonly bpinProductosService: BpinProductosService) {}
}
