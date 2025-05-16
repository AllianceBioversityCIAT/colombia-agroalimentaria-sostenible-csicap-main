import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { BpinSubproductoService } from './bpin-subproducto.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { SearchRequest } from '../../shared/decorators/search-request.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetSubProductoDto } from './dto/get-bpin-suproducto.dto';

@ApiTags('bpin-subproducto')
@ApiBearerAuth()
@Controller()
export class BpinSubproductoController {
  constructor(private readonly bpinSubproductoService: BpinSubproductoService) {console.log('BpinSubproductoController cargado');}
  

  @ApiQuery({ name: 'producto_id', required: false, type: String, description: 'ID del Producto' })
  @ApiQuery({ name: 'producto_id', required: false, type: String, description: 'ID del Producto' })
  @Get('subproductos')
  async getSubproductos(@SearchRequest('user.id') userId: string, @Query() filtros: GetSubProductoDto) {
    return await this.bpinSubproductoService.obtenerSubproductosPorProducto(userId, filtros).then((res) =>
      ResponseUtils.format({
        description: `Subproductos obtenidos correctamente`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  };
}
