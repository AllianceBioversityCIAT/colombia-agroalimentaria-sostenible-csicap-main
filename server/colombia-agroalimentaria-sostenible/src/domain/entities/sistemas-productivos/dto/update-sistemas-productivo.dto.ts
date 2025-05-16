import { PartialType } from '@nestjs/swagger';
import { CreateSistemasProductivoDto } from './create-sistemas-productivo.dto';

export class UpdateSistemasProductivoDto extends PartialType(CreateSistemasProductivoDto) {}
