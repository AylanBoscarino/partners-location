import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PartnerInterfaceDocument,
  PartnerInterface,
} from './partner.interface';
import { Model } from 'mongoose';

@Injectable()
export class PartnerSeeder {
  constructor(
    @InjectModel('Partner')
    private readonly partnerModel: Model<PartnerInterfaceDocument>,
  ) {}
  async seed() {
    const count = await this.partnerModel.count({});
    if (count === 0) {
      const data: PartnerInterface[] = require('../../data/pdvs.json');
      await this.partnerModel.insertMany(data);
    }
  }
}
