import { PartialType } from '@nestjs/swagger';
import { CreateBpinResponsableDto } from './create-bpin-responsable.dto';

export class UpdateBpinResponsableDto extends PartialType(CreateBpinResponsableDto) {}
