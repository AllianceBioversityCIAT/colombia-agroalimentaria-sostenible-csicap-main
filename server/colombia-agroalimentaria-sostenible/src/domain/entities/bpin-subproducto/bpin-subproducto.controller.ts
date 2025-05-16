import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BpinSubproductoService } from './bpin-subproducto.service';
import { CreateBpinSubproductoDto } from './dto/create-bpin-subproducto.dto';
import { UpdateBpinSubproductoDto } from './dto/update-bpin-subproducto.dto';

@Controller('bpin-subproducto')
export class BpinSubproductoController {
  constructor(private readonly bpinSubproductoService: BpinSubproductoService) {}

  @Post()
  create(@Body() createBpinSubproductoDto: CreateBpinSubproductoDto) {
    return this.bpinSubproductoService.create(createBpinSubproductoDto);
  }

  @Get()
  findAll() {
    return this.bpinSubproductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bpinSubproductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBpinSubproductoDto: UpdateBpinSubproductoDto) {
    return this.bpinSubproductoService.update(+id, updateBpinSubproductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bpinSubproductoService.remove(+id);
  }
}
