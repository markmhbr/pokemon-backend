import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // atau bisa 'http://localhost:5173' biar lebih aman
  });
  
  await app.listen(process.env.PORT || 3000);
  
}
bootstrap();
