import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PartnerService } from './partner/partner.service';
import { PartnerSeeder } from './partner/partner-seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const seeder = app.get(PartnerSeeder);
  try {
    await seeder.seed();
  } catch (error) {
    console.error(error);
  }

  await app.listen(3000);
}
bootstrap();
