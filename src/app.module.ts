import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PartnerModule } from './partner/partner.module';
import { CounterModule } from './counter/counter.module';

@Module({
  imports: [PartnerModule, DatabaseModule, CounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
