
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/nayaa-property');
  const config = new DocumentBuilder()
    .setTitle('Swagger API')
    .setDescription('Nayaa Property Backend API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(3000, '0.0.0.0');
  console.log('Server is running on port 3000');
}
bootstrap();
