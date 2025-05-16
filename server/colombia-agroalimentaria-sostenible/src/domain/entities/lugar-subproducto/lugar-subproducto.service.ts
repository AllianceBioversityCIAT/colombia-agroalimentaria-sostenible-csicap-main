import { Injectable } from '@nestjs/common';
import { CreateLugarSubproductoDto } from './dto/create-lugar-subproducto.dto';
import { UpdateLugarSubproductoDto } from './dto/update-lugar-subproducto.dto';

@Injectable()
export class LugarSubproductoService {
  create(createLugarSubproductoDto: CreateLugarSubproductoDto) {
    return 'This action adds a new lugarSubproducto';
  }

  findAll() {
    return `This action returns all lugarSubproducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lugarSubproducto`;
  }

  update(id: number, updateLugarSubproductoDto: UpdateLugarSubproductoDto) {
    return `This action updates a #${id} lugarSubproducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} lugarSubproducto`;
  }
}
