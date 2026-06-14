import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetriaService } from './telemetria.service';
import { TelemetriaController } from './telemetria.controller';
import { Sesion } from '../sesiones/entities/sesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion])],
  controllers: [TelemetriaController],
  providers: [TelemetriaService],
})
export class TelemetriaModule {}
