import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { BpinObjetivosService } from './bpin-objetivos.service';
import { ResponseUtils } from '../../shared/utils/response.utils';
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
}
