import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TelemetriaService } from './telemetria.service';
import { GuardarTelemetriaDto } from './dto/guardar-telemetria.dto';

@Controller('telemetria')
export class TelemetriaController {
  constructor(private readonly telemetriaService: TelemetriaService) {}

  @Post('ingestar')
  @HttpCode(HttpStatus.CREATED) // Devuelve un código 201
  async ingestarDatos(@Body() guardarTelemetriaDto: GuardarTelemetriaDto) {
    await this.telemetriaService.procesarYGuardar(guardarTelemetriaDto);
    return {
      estado: 'OK',
      mensaje: 'Paquete de telemetría procesado y guardado correctamente',
    };
  }
}
