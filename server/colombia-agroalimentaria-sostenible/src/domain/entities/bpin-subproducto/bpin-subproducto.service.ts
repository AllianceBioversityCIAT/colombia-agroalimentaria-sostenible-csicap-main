import { Injectable } from '@nestjs/common';
import { CreateBpinSubproductoDto } from './dto/create-bpin-subproducto.dto';
import { UpdateBpinSubproductoDto } from './dto/update-bpin-subproducto.dto';

@Injectable()
export class BpinSubproductoService {
  create(createBpinSubproductoDto: CreateBpinSubproductoDto) {
    return 'This action adds a new bpinSubproducto';
  }

  findAll() {
    return `This action returns all bpinSubproducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bpinSubproducto`;
  }

  update(id: number, updateBpinSubproductoDto: UpdateBpinSubproductoDto) {
    return `This action updates a #${id} bpinSubproducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} bpinSubproducto`;
  }
}
