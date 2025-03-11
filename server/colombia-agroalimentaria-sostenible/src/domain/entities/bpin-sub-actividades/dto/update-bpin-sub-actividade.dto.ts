import { PartialType } from '@nestjs/swagger';
import { CreateBpinSubActividadeDto } from './create-bpin-sub-actividade.dto';

export class UpdateBpinSubActividadeDto extends PartialType(
  CreateBpinSubActividadeDto,
) {}
