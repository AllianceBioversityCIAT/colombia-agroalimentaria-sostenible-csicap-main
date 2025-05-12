import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { FechasCorteService } from './fechas_corte.service';
import { SearchRequest } from '../../shared/decorators/search-request.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';

@ApiTags('Fechas Corte')
@ApiBearerAuth()
@Controller()
export class FechasCorteController {
  constructor(private readonly fechasCorteService: FechasCorteService) {}

  @Get('fechas-corte')
  async getFechasCorte(@SearchRequest('user.id') userId: string) {
    return this.fechasCorteService.obtenerFechasPorUsuario(userId).then(res =>
      ResponseUtils.format({
            description: `Fechas de corte obtenidas correctamente`,
            data: res,
            status: HttpStatus.OK,
          })
    );
  }
}
