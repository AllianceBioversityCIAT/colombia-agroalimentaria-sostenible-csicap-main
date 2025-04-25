import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BpinProductosXEjeService } from './bpin-productos-x-eje.service';
import { CreateBpinProductosXEjeDto } from './dto/create-bpin-productos-x-eje.dto';
import { UpdateBpinProductosXEjeDto } from './dto/update-bpin-productos-x-eje.dto';

@Controller('bpin-productos-x-eje')
export class BpinProductosXEjeController {
  constructor(private readonly bpinProductosXEjeService: BpinProductosXEjeService) {}

}
