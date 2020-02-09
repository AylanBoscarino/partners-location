import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  PartnerInterfaceDocument,
  PartnerInterface,
} from './partner.interface';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel('Partner')
    private readonly partnerModel: Model<PartnerInterfaceDocument>,
  ) {}

  async find(): Promise<PartnerInterface[]> {
    return this.partnerModel.find();
  }

  async get(id: number): Promise<PartnerInterface> {
    return this.partnerModel.findById(id);
  }
}
