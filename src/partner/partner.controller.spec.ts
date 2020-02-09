import { Test, TestingModule } from '@nestjs/testing';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { createMockFactory } from '../util/tests';
import { PartnerInterfaceDocument } from './partner.interface';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const partnerModelMockFactory = createMockFactory<
  Model<PartnerInterfaceDocument>
>({});

describe('Partner Controller', () => {
  let controller: PartnerController;
  let partnerService: PartnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerController],
      providers: [
        PartnerService,
        {
          provide: getModelToken('Partner'),
          useFactory: partnerModelMockFactory,
        },
      ],
    }).compile();

    partnerService = module.get<PartnerService>(PartnerService);
    controller = module.get<PartnerController>(PartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create new partner', async () => {});
});
