import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema } from './partner.schema';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { PartnerSeeder } from './partner-seeder';
import { CounterModule } from '../counter/counter.module';
import { CounterProvider } from '../counter/counter.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Partner',
        schema: PartnerSchema,
      },
    ]),
    CounterModule,
  ],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerSeeder, CounterProvider],
})
export class PartnerModule {}
