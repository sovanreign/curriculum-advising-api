import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './database/database-exception.filter';
import { DeansService } from './deans/deans.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const deansService = app.get(DeansService);
  if (!(await deansService.findOneByUsername('admin'))) {
    await deansService.create({
      username: 'admin',
      password: 'password',
      firstName: 'Bongbong',
      lastName: 'Marcos',
      deanId: '01-1947',
      email: 'mrpresident@gmail.com',
      address: 'Malacanang, Quezon City',
      contact: '+639123456789',
      departmentId: 1,
    });
    console.log('ADMIN CREATED');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new DatabaseExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
