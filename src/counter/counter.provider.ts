import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CounterInterfaceDocument } from './counter.interface';

@Injectable()
export class CounterProvider {
  constructor(
    @InjectModel('Counter')
    private readonly counterModel: Model<CounterInterfaceDocument>,
  ) {}

  async createSequenceValue(id: string) {
    return this.counterModel.create({ id, sequence_value: 0 });
  }

  async getNextSequenceValue(id: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      {
        id,
      },
      {
        $inc: { sequence_value: 1 },
      },
    );

    if (!counter) {
      await this.counterModel.create({ id, sequence_value: 0 });
      return this.getNextSequenceValue(id);
    }

    return counter.sequence_value;
  }
}
