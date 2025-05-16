import { PartialType } from '@nestjs/mapped-types';
import { CreateBpinLugarDto } from './create-bpin-lugar.dto';

export class UpdateBpinLugarDto extends PartialType(CreateBpinLugarDto) {}
