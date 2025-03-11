import { PartialType } from '@nestjs/swagger';
import { CreateGcfSubactividadeDto } from './create-gcf-subactividade.dto';

export class UpdateGcfSubactividadeDto extends PartialType(CreateGcfSubactividadeDto) {}
