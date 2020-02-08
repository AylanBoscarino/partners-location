import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema } from './partner.schema';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

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
  providers: [PartnerService],
})
export class PartnerModule {}
