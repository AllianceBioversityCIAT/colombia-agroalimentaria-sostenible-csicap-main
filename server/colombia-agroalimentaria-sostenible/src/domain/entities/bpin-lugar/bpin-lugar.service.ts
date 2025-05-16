import { Injectable } from '@nestjs/common';
import { CreateBpinLugarDto } from './dto/create-bpin-lugar.dto';
import { UpdateBpinLugarDto } from './dto/update-bpin-lugar.dto';

@Injectable()
export class BpinLugarService {
  create(createBpinLugarDto: CreateBpinLugarDto) {
    return 'This action adds a new bpinLugar';
  }

  findAll() {
    return `This action returns all bpinLugar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bpinLugar`;
  }

  update(id: number, updateBpinLugarDto: UpdateBpinLugarDto) {
    return `This action updates a #${id} bpinLugar`;
  }

  remove(id: number) {
    return `This action removes a #${id} bpinLugar`;
  }
}
