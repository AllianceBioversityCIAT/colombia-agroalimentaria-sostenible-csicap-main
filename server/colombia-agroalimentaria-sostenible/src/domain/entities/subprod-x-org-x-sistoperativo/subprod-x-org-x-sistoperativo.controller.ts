import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubprodXOrgXSistoperativoService } from './subprod-x-org-x-sistoperativo.service';
import { CreateSubprodXOrgXSistoperativoDto } from './dto/create-subprod-x-org-x-sistoperativo.dto';
import { UpdateSubprodXOrgXSistoperativoDto } from './dto/update-subprod-x-org-x-sistoperativo.dto';

@Controller('subprod-x-org-x-sistoperativo')
export class SubprodXOrgXSistoperativoController {
  constructor(private readonly subprodXOrgXSistoperativoService: SubprodXOrgXSistoperativoService) {}

  @Post()
  create(@Body() createSubprodXOrgXSistoperativoDto: CreateSubprodXOrgXSistoperativoDto) {
    return this.subprodXOrgXSistoperativoService.create(createSubprodXOrgXSistoperativoDto);
  }

  @Get()
  findAll() {
    return this.subprodXOrgXSistoperativoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subprodXOrgXSistoperativoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubprodXOrgXSistoperativoDto: UpdateSubprodXOrgXSistoperativoDto) {
    return this.subprodXOrgXSistoperativoService.update(+id, updateSubprodXOrgXSistoperativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subprodXOrgXSistoperativoService.remove(+id);
  }
}
