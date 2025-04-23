import { BadRequestException, Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { GcfEjesService } from './gcf-ejes.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';

@ApiTags('GCF Ejes')
@ApiBearerAuth()
@Controller()
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

  @Get('filtro_eje')
  @ApiQuery({
    name: 'roleIds',
    required: true,
    description: 'IDs de roles asignados al usuario, separados por coma',
    type: String,
  })
  async getEjes(@Query('roleIds') roleIds: string) {
    return this.gcfEjesService.getEjesByRoles(roleIds).then(res =>
      ResponseUtils.format({
        data: res,
        description: 'Endpoint de ejes consultado correctamente',
        status: HttpStatus.OK,
      })
    );
  }
}
