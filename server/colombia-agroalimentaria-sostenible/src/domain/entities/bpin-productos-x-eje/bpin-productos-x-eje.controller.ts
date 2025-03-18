import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BpinProductosXEjeService } from './bpin-productos-x-eje.service';
import { CreateBpinProductosXEjeDto } from './dto/create-bpin-productos-x-eje.dto';
import { UpdateBpinProductosXEjeDto } from './dto/update-bpin-productos-x-eje.dto';

@Controller('bpin-productos-x-eje')
export class BpinProductosXEjeController {
  constructor(private readonly bpinProductosXEjeService: BpinProductosXEjeService) {}

  @Post()
  create(@Body() createBpinProductosXEjeDto: CreateBpinProductosXEjeDto) {
    return this.bpinProductosXEjeService.create(createBpinProductosXEjeDto);
  }

  @Get()
  findAll() {
    return this.bpinProductosXEjeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bpinProductosXEjeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBpinProductosXEjeDto: UpdateBpinProductosXEjeDto) {
    return this.bpinProductosXEjeService.update(+id, updateBpinProductosXEjeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bpinProductosXEjeService.remove(+id);
  }
}
