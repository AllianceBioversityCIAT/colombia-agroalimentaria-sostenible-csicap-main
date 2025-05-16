import { PartialType } from '@nestjs/mapped-types';
import { CreateBpinEntregableDto } from './create-bpin-entregable.dto';

export class UpdateBpinEntregableDto extends PartialType(CreateBpinEntregableDto) {}
