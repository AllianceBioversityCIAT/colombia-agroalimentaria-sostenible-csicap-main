import { Injectable } from '@nestjs/common';
import { CreateSistemasProductivoDto } from './dto/create-sistemas-productivo.dto';
import { UpdateSistemasProductivoDto } from './dto/update-sistemas-productivo.dto';

@Injectable()
export class SistemasProductivosService {
  create(createSistemasProductivoDto: CreateSistemasProductivoDto) {
    return 'This action adds a new sistemasProductivo';
  }

  findAll() {
    return `This action returns all sistemasProductivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sistemasProductivo`;
  }

  update(id: number, updateSistemasProductivoDto: UpdateSistemasProductivoDto) {
    return `This action updates a #${id} sistemasProductivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} sistemasProductivo`;
  }
}
