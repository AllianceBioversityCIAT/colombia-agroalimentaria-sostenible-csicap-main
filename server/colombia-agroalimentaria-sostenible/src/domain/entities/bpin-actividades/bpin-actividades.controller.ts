import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BpinActividadesService } from './bpin-actividades.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('bpin-actividades')
@ApiBearerAuth()
@Controller()
export class BpinActividadesController {
  constructor(
    private readonly bpinActividadesService: BpinActividadesService,
  ) {}

  @Get('id-nombres')
  async getIdYNombres() {
    return await this.bpinActividadesService.obtenerIdYNombres().then((res) =>
      ResponseUtils.format({
        description: `Id y nombre de actividades obtenidos correctamente`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  };
}
