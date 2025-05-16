import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetSubProductoDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Producto id',
    type: String,
    default: '1',
  })
  producto_id?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Subproducto id',
    type: String,
    default: '1',
  })
  subproducto_id?: string;


}