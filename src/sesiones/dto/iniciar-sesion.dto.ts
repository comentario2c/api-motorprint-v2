import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IniciarSesionDto {
  @IsInt()
  @IsNotEmpty()
  id_estudiante!: number;

  @IsInt()
  @IsOptional()
  id_grupo?: number;

  @IsInt()
  @IsOptional()
  id_rutina?: number;

  @IsInt()
  @IsOptional()
  id_ejercicio?: number;

  @IsString()
  @IsOptional()
  dispositivo?: string;
}
