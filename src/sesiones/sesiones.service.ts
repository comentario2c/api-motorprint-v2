import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importamos el generador de UUIDs
import { Sesion } from './entities/sesion.entity';
import { IniciarSesionDto } from './dto/iniciar-sesion.dto';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private sesionesRepository: Repository<Sesion>,
  ) {}

  async iniciarSesion(datos: IniciarSesionDto): Promise<Sesion> {
    // Generamos el puente lógico para InfluxDB
    const uuidGenerado = uuidv4();

    const nuevaSesion = this.sesionesRepository.create({
      influxSessionId: uuidGenerado,
      idEstudiante: datos.id_estudiante,
      idGrupo: datos.id_grupo || 1,
      idRutina: datos.id_rutina || 1,
      idEjercicio: datos.id_ejercicio || 1,
      fechaInicio: new Date(),
      completada: 0,
      dispositivo: datos.dispositivo || 'Dispositivo Desconocido',
    });

    return await this.sesionesRepository.save(nuevaSesion);
  }
}
