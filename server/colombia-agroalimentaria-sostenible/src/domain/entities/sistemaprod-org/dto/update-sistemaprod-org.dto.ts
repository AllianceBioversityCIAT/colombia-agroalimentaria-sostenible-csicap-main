import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaprodOrgDto } from './create-sistemaprod-org.dto';

export class UpdateSistemaprodOrgDto extends PartialType(CreateSistemaprodOrgDto) {}
