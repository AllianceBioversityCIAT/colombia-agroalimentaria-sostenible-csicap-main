import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { Response } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { isEmpty } from '../../shared/utils/object.utils';

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

  @Get('excel-plan-operativo')
  async exportarExcel(@Res() res: Response) {
    const stream = await this.bpinObjetivosService.generarExcelStream();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Plan_Operativo.xlsx');
    stream.pipe(res);
  }

}
