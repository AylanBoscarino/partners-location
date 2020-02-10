import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePartnerDto } from './create-partner.dto';
import {
  PartnerInterface,
  PartnerInterfaceDocument,
} from './partner.interface';
import { CounterProvider } from '../counter/counter.provider';

@Injectable()
export class PartnerService {
  private readonly SEQUENCE_VALUE_ID = 'partnerid';
  constructor(
    @InjectModel('Partner')
    private readonly partnerModel: Model<PartnerInterfaceDocument>,
    private readonly counterProvider: CounterProvider,
  ) {}

  async find(): Promise<PartnerInterface[]> {
    return this.partnerModel.find();
  }

  async get(id: number): Promise<PartnerInterface> {
    return this.partnerModel.findOne({ id });
  }

  async create(partner: CreatePartnerDto): Promise<PartnerInterface> {
    return this.partnerModel.create({
      ...partner,
      id: await this.counterProvider.getNextSequenceValue(
        this.SEQUENCE_VALUE_ID,
      ),
    });
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
