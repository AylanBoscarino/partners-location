import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        if (configService.get('NODE_ENV') === 'test') {
          const mongod = new MongoMemoryServer();
          const uri = await mongod.getConnectionString();
          return { uri, useNewUrlParser: true, useUnifiedTopology: true };
        }
        return {
          uri: configService.get<string>('DATABASE_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
