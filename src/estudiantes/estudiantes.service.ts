import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private estudiantesRepository: Repository<Estudiante>,
  ) {}

  async registrarRapido(
    crearEstudianteDto: CrearEstudianteDto,
  ): Promise<Estudiante> {
    const nuevoEstudiante = this.estudiantesRepository.create({
      nombre: crearEstudianteDto.nombre,
      rut: 'SIN_RUT_TEST',
      apellido: 'APELLIDO_TEST',
      fechaNacimiento: '2015-01-01',
      genero: 'SIN_DATO',
    });

    return await this.estudiantesRepository.save(nuevoEstudiante);
  }
}
