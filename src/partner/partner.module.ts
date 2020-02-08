import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema } from './partner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Partner',
        schema: PartnerSchema,
      },
    ]),
  ],
})
export class PartnerModule {}
