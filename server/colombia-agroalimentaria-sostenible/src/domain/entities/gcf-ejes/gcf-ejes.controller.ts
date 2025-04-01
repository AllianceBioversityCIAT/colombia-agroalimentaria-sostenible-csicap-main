import { Controller, Get, HttpStatus } from '@nestjs/common';
import { GcfEjesService } from './gcf-ejes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';

@ApiTags('GCF Ejes')
@ApiBearerAuth()
@Controller('gcf-ejes')
export class GcfEjesController {
  constructor(private readonly gcfEjesService: GcfEjesService) {}

  @Get('ejes_id')
  async findEjes() {
    return this.gcfEjesService.findEjes().then(res => ResponseUtils.format({
      data: res,
      description: 'Ejes encontrados correctamente',
      status: HttpStatus.OK,
    }))
  }
}
