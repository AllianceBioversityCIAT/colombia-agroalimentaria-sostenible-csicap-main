import { Injectable } from '@nestjs/common';
import { CreateSistemaprodOrgDto } from './dto/create-sistemaprod-org.dto';
import { UpdateSistemaprodOrgDto } from './dto/update-sistemaprod-org.dto';

@Injectable()
export class SistemaprodOrgService {
  create(createSistemaprodOrgDto: CreateSistemaprodOrgDto) {
    return 'This action adds a new sistemaprodOrg';
  }

  findAll() {
    return `This action returns all sistemaprodOrg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sistemaprodOrg`;
  }

  update(id: number, updateSistemaprodOrgDto: UpdateSistemaprodOrgDto) {
    return `This action updates a #${id} sistemaprodOrg`;
  }

  remove(id: number) {
    return `This action removes a #${id} sistemaprodOrg`;
  }
}
