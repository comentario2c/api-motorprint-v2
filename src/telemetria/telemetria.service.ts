import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from '@influxdata/influxdb3-client';
import { InfluxService } from '../influx/influx.service';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { GuardarTelemetriaDto } from './dto/guardar-telemetria.dto';

@Injectable()
export class TelemetriaService {
  private readonly logger = new Logger(TelemetriaService.name);

  constructor(
    private readonly influxService: InfluxService,
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
  ) {}

  async procesarYGuardar(datos: GuardarTelemetriaDto): Promise<void> {
    const { id_sesion, influx_session_id, lecturas } = datos;

    const puntosInflux = lecturas.map((fila) => {
      const [timestamp_ms, ax, ay, az, gx, gy, gz] = fila;

      return Point.measurement('movimiento')
        .setTag('session_id', influx_session_id)
        .setFloatField('ax', ax)
        .setFloatField('ay', ay)
        .setFloatField('az', az)
        .setFloatField('gx', gx)
        .setFloatField('gy', gy)
        .setFloatField('gz', gz)
        .setTimestamp(new Date(timestamp_ms));
    });

    // 2. Disparar el lote masivo a InfluxDB
    await this.influxService.escribirTelemetria(puntosInflux);

    // 3. Cerrar la sesión en MariaDB
    await this.sesionRepository.update(id_sesion, {
      completada: 1,
      fechaFin: new Date(),
    });

    this.logger.log(
      `Sesión ${id_sesion} completada. ${puntosInflux.length} lecturas guardadas con éxito.`,
    );
  }
}
