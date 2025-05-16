import { PartialType } from '@nestjs/swagger';
import { CreateLugarSubproductoDto } from './create-lugar-subproducto.dto';

export class UpdateLugarSubproductoDto extends PartialType(CreateLugarSubproductoDto) {}
