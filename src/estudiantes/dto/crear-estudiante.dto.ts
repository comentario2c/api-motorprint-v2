import { IsString, IsNotEmpty } from 'class-validator';

export class CrearEstudianteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del estudiante no puede estar vacío' })
  nombre!: string;
}
