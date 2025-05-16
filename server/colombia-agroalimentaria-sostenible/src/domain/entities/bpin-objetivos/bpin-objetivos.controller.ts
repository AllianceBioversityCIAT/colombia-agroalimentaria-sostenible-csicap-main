import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { Response } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { isEmpty } from '../../shared/utils/object.utils';
import { SearchRequest } from '../../shared/decorators/search-request.decorator';
import { GetPlanOperativoDto } from './dto/get-plan-operativo.dto';

@ApiTags('Ficha BPIN')
@ApiBearerAuth()
@Controller()
export class BpinObjetivosController {
  constructor(private readonly bpinObjetivosService: BpinObjetivosService) {}

  @ApiQuery({
    name: 'objectivo',
    required: false,
    description: 'Objectivo to filter the results',
    type: String,
  })
  @Get('ficha-bpin')
  async findFichaBPIN(@Query('objectivo') objetivo: string) {
    console.log(
      'objectivo',
      !isEmpty(objetivo) ? objetivo?.split(',').map((id) => Number(id)) : null,
    );
    return this.bpinObjetivosService
      .findFichaBPIN({
        objectiveId: !isEmpty(objetivo)
          ? objetivo?.split(',').map((id) => Number(id))
          : null,
      })
      .then((res) =>
        ResponseUtils.format({
          description: `Find all BPIN objectives`,
          data: res,
          status: HttpStatus.OK,
        }),
      );
  }

  @Get()
  async findObjetivos() {
    return this.bpinObjetivosService.findObjetivos().then((res) =>
      ResponseUtils.format({
        description: `Find all objectives`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  }

  @Get('plan-operativo-ciat')
  async planOperativoCIAT() {
    return await this.bpinObjetivosService.planOperativoCIAT().then((res) =>
      ResponseUtils.format({
        description: `Plan operativo CIAT obtenido correctamente`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  }

  @Get('excel-plan-operativo-ciat')
  async exportarExcel(@Res() res: Response) {
    const stream = await this.bpinObjetivosService.generarExcel();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Plan_Operativo.xlsx');
    stream.pipe(res);
  }

  @ApiQuery({ name: 'objetivo', required: false, type: String, description: 'ID del Objetivo' })
  @ApiQuery({ name: 'actividad_id', required: false, type: String, description: 'ID de la Actividad' })
  @ApiQuery({ name: 'subactividad_id', required: false, type: String, description: 'ID de la Subactividad' })
  @ApiQuery({ name: 'eje_id', required: false, type: String, description: 'ID del Eje' })
  @ApiQuery({ name: 'producto_id', required: false, type: String, description: 'ID del Producto' })
  @Get('plan-operativo-socio')
  async planOperativoSocio(@SearchRequest('user.id') userId: string, @Query() filtros: GetPlanOperativoDto,) {
    return await this.bpinObjetivosService.getPlanOperativoSocio(userId, filtros).then((res) =>
      ResponseUtils.format({
        description: `Plan operativo Socio obtenido correctamente`,
        data: res,
        status: HttpStatus.OK,
      }),
    );
  }

}
