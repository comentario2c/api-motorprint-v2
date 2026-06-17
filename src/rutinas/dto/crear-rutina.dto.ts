import { IsString, IsNotEmpty, IsArray, IsInt } from 'class-validator';

export class CrearRutinaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsArray()
  @IsInt({ each: true })
  ejercicios_ids!: number[];
}
