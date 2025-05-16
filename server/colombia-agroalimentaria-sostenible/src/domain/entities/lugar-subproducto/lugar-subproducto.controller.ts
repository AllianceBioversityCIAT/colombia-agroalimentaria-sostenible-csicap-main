import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LugarSubproductoService } from './lugar-subproducto.service';
import { CreateLugarSubproductoDto } from './dto/create-lugar-subproducto.dto';
import { UpdateLugarSubproductoDto } from './dto/update-lugar-subproducto.dto';

@Controller('lugar-subproducto')
export class LugarSubproductoController {
  constructor(private readonly lugarSubproductoService: LugarSubproductoService) {}

  @Post()
  create(@Body() createLugarSubproductoDto: CreateLugarSubproductoDto) {
    return this.lugarSubproductoService.create(createLugarSubproductoDto);
  }

  @Get()
  findAll() {
    return this.lugarSubproductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lugarSubproductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLugarSubproductoDto: UpdateLugarSubproductoDto) {
    return this.lugarSubproductoService.update(+id, updateLugarSubproductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lugarSubproductoService.remove(+id);
  }
}
