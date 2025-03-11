import { PartialType } from '@nestjs/swagger';
import { CreateBpinActividadeDto } from './create-bpin-actividade.dto';

export class UpdateBpinActividadeDto extends PartialType(
  CreateBpinActividadeDto,
) {}
