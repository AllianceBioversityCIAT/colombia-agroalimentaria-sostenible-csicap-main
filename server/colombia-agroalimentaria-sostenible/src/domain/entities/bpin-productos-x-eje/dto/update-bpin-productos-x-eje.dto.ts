import { PartialType } from '@nestjs/swagger';
import { CreateBpinProductosXEjeDto } from './create-bpin-productos-x-eje.dto';

export class UpdateBpinProductosXEjeDto extends PartialType(CreateBpinProductosXEjeDto) {}
