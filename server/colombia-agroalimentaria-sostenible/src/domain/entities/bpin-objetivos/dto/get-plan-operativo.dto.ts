import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPlanOperativoDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Objetivo id',
    type: String,
    default: '1',
  })
  public objetivo?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Actividad id',
    type: String,
  })
  actividad_id?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Subactividad id',
    type: String,
  })
  subactividad_id?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Eje id',
    type: String,
  })
  eje_id?: string;

  @IsOptional()
   @ApiProperty({
    required: false,
    description: 'Producto id',
    type: String,
  })
  producto_id?: string;
}