import { PartialType } from '@nestjs/swagger';
import { CreateGcfComponenteDto } from './create-gcf-componente.dto';

export class UpdateGcfComponenteDto extends PartialType(CreateGcfComponenteDto) {}
