import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BpinSubActividadesService } from './bpin-sub-actividades.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('bpin-sub-actividades')
@ApiBearerAuth()
@Controller()
export class BpinSubActividadesController {
  constructor(
    private readonly bpinSubActividadesService: BpinSubActividadesService,
  ) {}

  @Get('id-nombres')
  async getIdYNombres() {
    return await this.bpinSubActividadesService.obtenerIdYNombres().then((res) =>
      ResponseUtils.format({
        description: `Id y nombre de subactividades obtenidos correctamente`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  };
}
