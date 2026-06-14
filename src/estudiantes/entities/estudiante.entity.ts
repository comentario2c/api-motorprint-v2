import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn({ name: 'id_estudiante' })
  id!: number;

  @Column({ type: 'varchar', length: 12, name: 'rut' })
  rut!: string;

  @Column({ type: 'varchar', length: 100, name: 'nombre' })
  nombre!: string;

  @Column({ type: 'varchar', length: 100, name: 'apellido' })
  apellido!: string;

  @Column({ type: 'date', name: 'fechaNacimiento' })
  fechaNacimiento!: string;

  @Column({ type: 'varchar', length: 20, name: 'genero', nullable: true })
  genero!: string | null;

  @Column({ type: 'float', name: 'peso', nullable: true })
  peso!: number | null;

  @Column({ type: 'int', name: 'talla', nullable: true })
  talla!: number | null;

  @Column({ type: 'float', name: 'tallaSentado', nullable: true })
  tallaSentado!: number | null;

  @Column({ type: 'varchar', length: 20, name: 'dominancia', nullable: true })
  dominancia!: string | null;
}
