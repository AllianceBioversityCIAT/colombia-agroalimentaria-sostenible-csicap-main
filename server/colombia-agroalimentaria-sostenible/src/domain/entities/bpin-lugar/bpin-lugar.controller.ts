import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BpinLugarService } from './bpin-lugar.service';
import { CreateBpinLugarDto } from './dto/create-bpin-lugar.dto';
import { UpdateBpinLugarDto } from './dto/update-bpin-lugar.dto';

@Controller('bpin-lugar')
export class BpinLugarController {
  constructor(private readonly bpinLugarService: BpinLugarService) {}

  @Post()
  create(@Body() createBpinLugarDto: CreateBpinLugarDto) {
    return this.bpinLugarService.create(createBpinLugarDto);
  }

  @Get()
  findAll() {
    return this.bpinLugarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bpinLugarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBpinLugarDto: UpdateBpinLugarDto) {
    return this.bpinLugarService.update(+id, updateBpinLugarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bpinLugarService.remove(+id);
  }
}
