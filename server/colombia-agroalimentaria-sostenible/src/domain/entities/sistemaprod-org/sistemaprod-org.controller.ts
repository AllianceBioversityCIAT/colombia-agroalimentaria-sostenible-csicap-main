import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SistemaprodOrgService } from './sistemaprod-org.service';
import { CreateSistemaprodOrgDto } from './dto/create-sistemaprod-org.dto';
import { UpdateSistemaprodOrgDto } from './dto/update-sistemaprod-org.dto';

@Controller('sistemaprod-org')
export class SistemaprodOrgController {
  constructor(private readonly sistemaprodOrgService: SistemaprodOrgService) {}

  @Post()
  create(@Body() createSistemaprodOrgDto: CreateSistemaprodOrgDto) {
    return this.sistemaprodOrgService.create(createSistemaprodOrgDto);
  }

  @Get()
  findAll() {
    return this.sistemaprodOrgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sistemaprodOrgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSistemaprodOrgDto: UpdateSistemaprodOrgDto) {
    return this.sistemaprodOrgService.update(+id, updateSistemaprodOrgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sistemaprodOrgService.remove(+id);
  }
}
