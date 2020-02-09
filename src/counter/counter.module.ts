import { Module } from '@nestjs/common';
import { CounterProvider } from './counter.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from './counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Counter',
        schema: CounterSchema,
      },
    ]),
  ],
  providers: [CounterProvider],
  exports: [CounterProvider],
})
export class CounterModule {}
