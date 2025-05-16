import { Injectable } from '@nestjs/common';
import { CreateBpinHitoDto } from './dto/create-bpin-hito.dto';
import { UpdateBpinHitoDto } from './dto/update-bpin-hito.dto';

@Injectable()
export class BpinHitosService {
  create(createBpinHitoDto: CreateBpinHitoDto) {
    return 'This action adds a new bpinHito';
  }

  findAll() {
    return `This action returns all bpinHitos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bpinHito`;
  }

  update(id: number, updateBpinHitoDto: UpdateBpinHitoDto) {
    return `This action updates a #${id} bpinHito`;
  }

  remove(id: number) {
    return `This action removes a #${id} bpinHito`;
  }
}
