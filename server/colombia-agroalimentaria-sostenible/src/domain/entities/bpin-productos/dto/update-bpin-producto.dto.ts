import { PartialType } from '@nestjs/swagger';
import { CreateBpinProductoDto } from './create-bpin-producto.dto';

export class UpdateBpinProductoDto extends PartialType(CreateBpinProductoDto) {}
