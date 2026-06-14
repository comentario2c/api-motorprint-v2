import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class GuardarTelemetriaDto {
  @IsInt()
  @IsNotEmpty()
  id_sesion!: number;

  @IsString()
  @IsNotEmpty()
  influx_session_id!: string;

  @IsArray()
  @ArrayMinSize(1)
  lecturas!: number[][];
}
