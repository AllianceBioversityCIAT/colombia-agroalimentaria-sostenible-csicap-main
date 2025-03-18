import { Injectable } from '@nestjs/common';
import { CreateBpinProductosXEjeDto } from './dto/create-bpin-productos-x-eje.dto';
import { UpdateBpinProductosXEjeDto } from './dto/update-bpin-productos-x-eje.dto';

@Injectable()
export class BpinProductosXEjeService {
  create(createBpinProductosXEjeDto: CreateBpinProductosXEjeDto) {
    return 'This action adds a new bpinProductosXEje';
  }

  findAll() {
    return `This action returns all bpinProductosXEje`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bpinProductosXEje`;
  }

  update(id: number, updateBpinProductosXEjeDto: UpdateBpinProductosXEjeDto) {
    return `This action updates a #${id} bpinProductosXEje`;
  }

  remove(id: number) {
    return `This action removes a #${id} bpinProductosXEje`;
  }
}
