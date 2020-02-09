import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema } from './partner.schema';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { PartnerSeeder } from './partner-seeder';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Partner',
        schema: PartnerSchema,
      },
    ]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerSeeder],
})
export class PartnerModule {}
