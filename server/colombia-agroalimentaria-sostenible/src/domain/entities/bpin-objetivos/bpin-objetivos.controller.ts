import { Controller } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';

@Controller('bpin-objetivos')
export class BpinObjetivosController {
  constructor(private readonly bpinObjetivosService: BpinObjetivosService) {}
}
