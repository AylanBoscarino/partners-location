import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePartnerDto } from './create-partner.dto';
import {
  PartnerInterface,
  PartnerInterfaceDocument,
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
    return this.partnerModel.findOne({ id });
  }

  async create(partner: CreatePartnerDto): Promise<PartnerInterface> {
    return this.partnerModel.create(partner);
  }

  async searchNearest(
    lng: number,
    lat: number,
  ): Promise<PartnerInterface | void> {
    const geometry = {
      type: 'Point',
      coordinates: [lng, lat],
    };
    return this.partnerModel.findOne({
      coverageArea: {
        $geoIntersects: {
          $geometry: geometry,
        },
      },
      address: {
        $nearSphere: {
          $geometry: geometry,
        },
      },
    });
  }
}
