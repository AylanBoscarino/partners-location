import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PartnerInterfaceDocument,
  PartnerInterface,
} from './partner.interface';
import { Model } from 'mongoose';
import { CounterInterfaceDocument } from '../counter/counter.interface';

@Injectable()
export class PartnerSeeder {
  constructor(
    @InjectModel('Partner')
    private readonly partnerModel: Model<PartnerInterfaceDocument>,
    @InjectModel('Counter')
    private readonly counterModel: Model<CounterInterfaceDocument>,
  ) {}
  async seed() {
    const count = await this.partnerModel.countDocuments();
    if (count === 0) {
      const data: PartnerInterface[] = require('../../data/pdvs.json');
      await this.partnerModel.insertMany(data);
      await this.counterModel.create({
        id: 'partnerid',
        sequence_value: data.length + 1,
      });
    }
  }
}
