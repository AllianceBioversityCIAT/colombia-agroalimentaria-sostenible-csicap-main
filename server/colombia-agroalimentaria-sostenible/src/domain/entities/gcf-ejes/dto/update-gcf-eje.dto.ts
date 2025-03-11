import { PartialType } from '@nestjs/swagger';
import { CreateGcfEjeDto } from './create-gcf-eje.dto';

export class UpdateGcfEjeDto extends PartialType(CreateGcfEjeDto) {}
