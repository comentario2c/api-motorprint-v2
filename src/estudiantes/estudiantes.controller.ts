import { Controller, Post, Body } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  async registrar(@Body() crearEstudianteDto: CrearEstudianteDto) {
    const estudianteGuardado =
      await this.estudiantesService.registrarRapido(crearEstudianteDto);
    return {
      mensaje: 'Estudiante registrado correctamente',
      id_estudiante: estudianteGuardado.id,
    };
  }
}
