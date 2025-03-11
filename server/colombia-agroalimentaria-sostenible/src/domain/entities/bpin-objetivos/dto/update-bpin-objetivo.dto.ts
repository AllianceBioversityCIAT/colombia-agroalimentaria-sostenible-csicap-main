import { PartialType } from '@nestjs/swagger';
import { CreateBpinObjetivoDto } from './create-bpin-objetivo.dto';

export class UpdateBpinObjetivoDto extends PartialType(CreateBpinObjetivoDto) {}
