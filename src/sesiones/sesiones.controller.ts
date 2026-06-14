import { Controller, Post, Body } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { IniciarSesionDto } from './dto/iniciar-sesion.dto';

@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @Post('iniciar')
  async iniciar(@Body() iniciarSesionDto: IniciarSesionDto) {
    const sesionAbierta =
      await this.sesionesService.iniciarSesion(iniciarSesionDto);

    return {
      mensaje: 'Sesión de evaluación iniciada correctamente',
      id_sesion: sesionAbierta.id,
      influx_session_id: sesionAbierta.influxSessionId,
    };
  }
}
