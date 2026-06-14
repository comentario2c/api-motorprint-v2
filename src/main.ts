import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar CORS para permitir peticiones desde Flutter y Angular
  app.enableCors({
    origin: '*', // En producción, especificar los dominios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Configurar validación global estricta para los DTOs entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Lanza error si envían propiedades no permitidas
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor MotorPrint corriendo en: http://localhost:${port}/api`);
}
bootstrap().catch((err) => {
  console.error('Error crítico al iniciar la aplicación:', err);
  process.exit(1);
});
