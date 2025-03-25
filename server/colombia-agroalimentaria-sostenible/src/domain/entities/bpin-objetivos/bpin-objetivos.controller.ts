import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ficha BPIN')
@Controller()
export class BpinObjetivosController {
  constructor(private readonly bpinObjetivosService: BpinObjetivosService) {}

  @Get()
  async findFichaBPIN() {
    return this.bpinObjetivosService.findFichaBPIN().then((res) =>
      ResponseUtils.format({
        description: `Find all BPIN objectives`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  }
}
