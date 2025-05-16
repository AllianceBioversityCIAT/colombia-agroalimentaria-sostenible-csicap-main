import { PartialType } from '@nestjs/mapped-types';
import { CreateBpinHitoDto } from './create-bpin-hito.dto';

export class UpdateBpinHitoDto extends PartialType(CreateBpinHitoDto) {}
