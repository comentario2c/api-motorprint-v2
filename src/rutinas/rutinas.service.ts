/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrearRutinaDto } from './dto/crear-rutina.dto';

@Injectable()
export class RutinasService {
  constructor(private dataSource: DataSource) {}

  // OBTENER todas las rutinas
  async obtenerTodas() {
    const rutinas = await this.dataSource.query('SELECT * FROM rutina');
    return rutinas;
  }

  // CREAR una nueva rutina y asociar los ejercicios
  async crearRutina(datos: CrearRutinaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Insertar la nueva rutina
      const resultRutina = await queryRunner.query(
        'INSERT INTO rutina (nombre) VALUES (?)',
        [datos.nombre],
      );

      const idRutinaGenerado = resultRutina.insertId;

      // 2. Insertar los IDs en la tabla intermedia (rutinaejercicio)
      if (datos.ejercicios_ids && datos.ejercicios_ids.length > 0) {
        for (const idEjercicio of datos.ejercicios_ids) {
          await queryRunner.query(
            'INSERT INTO rutinaejercicio (id_rutina, id_ejercicio) VALUES (?, ?)',
            [idRutinaGenerado, idEjercicio],
          );
        }
      }

      await queryRunner.commitTransaction();

      return {
        mensaje: 'Rutina creada con éxito',
        id: idRutinaGenerado,
        cantidad_ejercicios: datos.ejercicios_ids.length,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const mensajeError =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Error al crear la rutina: ${mensajeError}`);
    } finally {
      await queryRunner.release();
    }
  }

  // OBTENER ejercicios de una rutina específica
  async obtenerEjerciciosPorRutina(id: number) {
    const rutina = await this.dataSource.query(
      'SELECT id_rutina FROM rutina WHERE id_rutina = ?',
      [id],
    );

    // Utilizamos Array.isArray como salvaguarda nativa de JavaScript
    if (!Array.isArray(rutina) || rutina.length === 0) {
      throw new NotFoundException('Rutina no encontrada');
    }

    const ejercicios = await this.dataSource.query(
      `SELECT e.* FROM ejercicio e 
       INNER JOIN rutinaejercicio re ON e.id_ejercicio = re.id_ejercicio 
       WHERE re.id_rutina = ?`,
      [id],
    );

    return ejercicios;
  }
}
