import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BpinEntregablesService } from './bpin-entregables.service';
import { CreateBpinEntregableDto } from './dto/create-bpin-entregable.dto';
import { UpdateBpinEntregableDto } from './dto/update-bpin-entregable.dto';

@Controller('bpin-entregables')
export class BpinEntregablesController {
  constructor(private readonly bpinEntregablesService: BpinEntregablesService) {}

  @Post()
  create(@Body() createBpinEntregableDto: CreateBpinEntregableDto) {
    return this.bpinEntregablesService.create(createBpinEntregableDto);
  }

  @Get()
  findAll() {
    return this.bpinEntregablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bpinEntregablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBpinEntregableDto: UpdateBpinEntregableDto) {
    return this.bpinEntregablesService.update(+id, updateBpinEntregableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bpinEntregablesService.remove(+id);
  }
}
