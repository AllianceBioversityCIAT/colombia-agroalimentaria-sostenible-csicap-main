import { Injectable } from '@nestjs/common';
import { CreateBpinEntregableDto } from './dto/create-bpin-entregable.dto';
import { UpdateBpinEntregableDto } from './dto/update-bpin-entregable.dto';

@Injectable()
export class BpinEntregablesService {
  create(createBpinEntregableDto: CreateBpinEntregableDto) {
    return 'This action adds a new bpinEntregable';
  }

  findAll() {
    return `This action returns all bpinEntregables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bpinEntregable`;
  }

  update(id: number, updateBpinEntregableDto: UpdateBpinEntregableDto) {
    return `This action updates a #${id} bpinEntregable`;
  }

  remove(id: number) {
    return `This action removes a #${id} bpinEntregable`;
  }
}
