import { PartialType } from '@nestjs/swagger';
import { CreateGcfActividadeDto } from './create-gcf-actividade.dto';

export class UpdateGcfActividadeDto extends PartialType(
  CreateGcfActividadeDto,
) {}
