import { PartialType } from '@nestjs/mapped-types';
import { CreateSubprodXOrgXSistoperativoDto } from './create-subprod-x-org-x-sistoperativo.dto';

export class UpdateSubprodXOrgXSistoperativoDto extends PartialType(CreateSubprodXOrgXSistoperativoDto) {}
