export class FechaCorteResponseDto {
  corte:number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'ABIERTO' | 'CERRADO' | 'PROXIMO_A_ABRIR';
  diasRestantes: number;
}