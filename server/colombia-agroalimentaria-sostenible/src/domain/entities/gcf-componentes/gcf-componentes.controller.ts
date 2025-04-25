import { Controller, Get, HttpStatus } from '@nestjs/common';
import { GcfComponentesService } from './gcf-componentes.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('GCF Componentes')
@ApiBearerAuth()
@Controller()
export class GcfComponentesController {
  constructor(private readonly gcfComponentesService: GcfComponentesService) {}

  @Get()
  async findAll() {
    return this.gcfComponentesService.findAll().then((data) =>
      ResponseUtils.format({
        data,
        description: 'GcfComponentes fetched successfully',
        status: HttpStatus.OK,
      }),
    );
  }

  @Get('test')
  getStatus() {
    return ResponseUtils.format({
      data: 'ok',
      description: 'Prueba de conexion exitosa',
      status: HttpStatus.OK,
    });
  }
}
