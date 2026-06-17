/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RutinasService } from './rutinas.service';
import { CrearRutinaDto } from './dto/crear-rutina.dto';

@Controller('rutinas')
export class RutinasController {
  constructor(private readonly rutinasService: RutinasService) {}

  @Get()
  async obtenerTodas() {
    return await this.rutinasService.obtenerTodas();
  }

  @Post()
  async crear(@Body() crearRutinaDto: CrearRutinaDto) {
    return await this.rutinasService.crearRutina(crearRutinaDto);
  }

  @Get(':id/ejercicios')
  async obtenerEjercicios(@Param('id', ParseIntPipe) id: number) {
    return await this.rutinasService.obtenerEjerciciosPorRutina(id);
  }
}
