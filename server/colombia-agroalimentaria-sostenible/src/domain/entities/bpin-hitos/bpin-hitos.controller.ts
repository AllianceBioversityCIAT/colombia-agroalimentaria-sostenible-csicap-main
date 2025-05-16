import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BpinHitosService } from './bpin-hitos.service';
import { CreateBpinHitoDto } from './dto/create-bpin-hito.dto';
import { UpdateBpinHitoDto } from './dto/update-bpin-hito.dto';

@Controller('bpin-hitos')
export class BpinHitosController {
  constructor(private readonly bpinHitosService: BpinHitosService) {}

  @Post()
  create(@Body() createBpinHitoDto: CreateBpinHitoDto) {
    return this.bpinHitosService.create(createBpinHitoDto);
  }

  @Get()
  findAll() {
    return this.bpinHitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bpinHitosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBpinHitoDto: UpdateBpinHitoDto) {
    return this.bpinHitosService.update(+id, updateBpinHitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bpinHitosService.remove(+id);
  }
}
