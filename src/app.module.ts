import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    // MongooseModule.forFeatureAsync([

    // ])
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
