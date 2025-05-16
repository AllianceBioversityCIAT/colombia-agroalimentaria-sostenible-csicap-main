import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SistemasProductivosService } from './sistemas-productivos.service';
import { CreateSistemasProductivoDto } from './dto/create-sistemas-productivo.dto';
import { UpdateSistemasProductivoDto } from './dto/update-sistemas-productivo.dto';

@Controller('sistemas-productivos')
export class SistemasProductivosController {
  constructor(private readonly sistemasProductivosService: SistemasProductivosService) {}

  @Post()
  create(@Body() createSistemasProductivoDto: CreateSistemasProductivoDto) {
    return this.sistemasProductivosService.create(createSistemasProductivoDto);
  }

  @Get()
  findAll() {
    return this.sistemasProductivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sistemasProductivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSistemasProductivoDto: UpdateSistemasProductivoDto) {
    return this.sistemasProductivosService.update(+id, updateSistemasProductivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sistemasProductivosService.remove(+id);
  }
}
