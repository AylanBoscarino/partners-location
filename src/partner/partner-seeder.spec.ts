import { Test, TestingModule } from '@nestjs/testing';

import { PartnerSeeder } from './partner-seeder';
import { createMockFactory } from '../util/tests';
import { Model } from 'mongoose';
import { PartnerInterfaceDocument } from './partner.interface';
import { getModelToken } from '@nestjs/mongoose';

const partnerModelMockFactory = createMockFactory<
  Model<PartnerInterfaceDocument>
>({});

describe('PartnerSeeder', () => {
  let provider: PartnerSeeder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnerSeeder,
        {
          provide: getModelToken('Partner'),
          useFactory: partnerModelMockFactory,
        },
      ],
    }).compile();

    provider = module.get<PartnerSeeder>(PartnerSeeder);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
