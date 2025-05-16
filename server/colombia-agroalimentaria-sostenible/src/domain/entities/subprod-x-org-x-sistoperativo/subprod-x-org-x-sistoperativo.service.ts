import { Injectable } from '@nestjs/common';
import { CreateSubprodXOrgXSistoperativoDto } from './dto/create-subprod-x-org-x-sistoperativo.dto';
import { UpdateSubprodXOrgXSistoperativoDto } from './dto/update-subprod-x-org-x-sistoperativo.dto';

@Injectable()
export class SubprodXOrgXSistoperativoService {
  create(createSubprodXOrgXSistoperativoDto: CreateSubprodXOrgXSistoperativoDto) {
    return 'This action adds a new subprodXOrgXSistoperativo';
  }

  findAll() {
    return `This action returns all subprodXOrgXSistoperativo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subprodXOrgXSistoperativo`;
  }

  update(id: number, updateSubprodXOrgXSistoperativoDto: UpdateSubprodXOrgXSistoperativoDto) {
    return `This action updates a #${id} subprodXOrgXSistoperativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} subprodXOrgXSistoperativo`;
  }
}
