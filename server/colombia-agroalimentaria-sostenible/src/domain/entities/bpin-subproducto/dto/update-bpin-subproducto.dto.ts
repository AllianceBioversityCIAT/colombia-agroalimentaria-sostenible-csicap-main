import { PartialType } from '@nestjs/swagger';
import { CreateBpinSubproductoDto } from './create-bpin-subproducto.dto';

export class UpdateBpinSubproductoDto extends PartialType(CreateBpinSubproductoDto) {}
