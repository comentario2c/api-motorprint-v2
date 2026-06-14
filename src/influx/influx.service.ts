import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfluxDBClient, Point } from '@influxdata/influxdb3-client';

@Injectable()
export class InfluxService implements OnModuleInit, OnModuleDestroy {
  // El operador !: le dice a TypeScript: "Confía en mí, lo inicializaré en onModuleInit"
  private client!: InfluxDBClient;
  private database!: string;
  private readonly logger = new Logger(InfluxService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // El operador ! al final asegura a TypeScript que estos valores no serán undefined
    const host = this.configService.get<string>('INFLUX_HOST')!;
    const token = this.configService.get<string>('INFLUX_TOKEN')!;
    this.database = this.configService.get<string>('INFLUX_DATABASE')!;

    this.client = new InfluxDBClient({
      host,
      token,
      database: this.database,
    });

    this.logger.log(
      `Conectado a InfluxDB 3 Core en ${host} (Database: ${this.database})`,
    );
  }

  // Agregamos async/await porque close() devuelve una promesa en el SDK v3
  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
    }
  }

  async escribirTelemetria(puntos: Point[]): Promise<void> {
    try {
      await this.client.write(puntos);
      this.logger.debug(
        `Lote de ${puntos.length} mediciones inyectado en InfluxDB.`,
      );
    } catch (error) {
      this.logger.error(
        'Fallo al escribir la serie temporal en InfluxDB:',
        error,
      );
      throw error;
    }
  }
}
