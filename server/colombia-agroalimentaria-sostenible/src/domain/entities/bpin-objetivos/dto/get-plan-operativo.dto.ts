import { IsOptional, IsString } from 'class-validator';

export class GetPlanOperativoDto {
  @IsString()
  objetivo: string;

  @IsOptional()
  @IsString()
  actividad_id?: string;

  @IsOptional()
  @IsString()
  subactividad_id?: string;

  @IsOptional()
  @IsString()
  eje_id?: string;

  @IsOptional()
  @IsString()
  producto_id?: string;
}