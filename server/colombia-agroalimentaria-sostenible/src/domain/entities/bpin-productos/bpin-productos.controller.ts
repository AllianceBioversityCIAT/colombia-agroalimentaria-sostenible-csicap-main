import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { BpinProductosService } from './bpin-productos.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchRequest } from '../../shared/decorators/search-request.decorator';

@ApiTags('bpin-productos')
@ApiBearerAuth()
@Controller()
export class BpinProductosController {
  constructor(private readonly bpinProductosService: BpinProductosService) {}

  @Get('id-nombres')
  async getIdYNombres() {
    return await this.bpinProductosService.obtenerIdYNombres().then((res) =>
      ResponseUtils.format({
        description: `Id y nombre de productos obtenidos correctamente`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  };

}
