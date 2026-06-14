import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sesion')
export class Sesion {
  @PrimaryGeneratedColumn({ name: 'id_sesion' })
  id!: number;

  @Column({
    type: 'varchar',
    length: 36,
    name: 'influx_session_id',
    unique: true,
  })
  influxSessionId!: string;

  @Column({ type: 'int', name: 'id_estudiante' })
  idEstudiante!: number;

  @Column({ type: 'int', name: 'id_grupo' })
  idGrupo!: number;

  @Column({ type: 'int', name: 'id_rutina' })
  idRutina!: number;

  @Column({ type: 'int', name: 'id_ejercicio' })
  idEjercicio!: number;

  @Column({ type: 'datetime', name: 'fecha_inicio' })
  fechaInicio!: Date;

  @Column({ type: 'datetime', name: 'fecha_fin', nullable: true })
  fechaFin!: Date | null;

  @Column({ type: 'tinyint', name: 'completada', default: 0 })
  completada!: number;

  @Column({ type: 'varchar', length: 100, name: 'dispositivo', nullable: true })
  dispositivo!: string | null;
}
