import { Test, TestingModule } from '@nestjs/testing';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { createMockFactory } from '../util/tests';
import {
  PartnerInterfaceDocument,
  PartnerInterface,
} from './partner.interface';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './create-partner.dto';

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

  it('should list all partners', async () => {
    jest
      .spyOn(partnerService, 'find')
      .mockImplementation(async () => [mockPartner]);

    expect(await controller.index()).toEqual({ pdvs: [mockPartner] });
    expect(partnerService.find).toHaveBeenCalled();
  });

  it('should get correct partner by id', async () => {
    jest
      .spyOn(partnerService, 'get')
      .mockImplementation(async (n: number) => mockPartner);

    expect(await controller.get({ id: 1 })).toEqual(mockPartner);
    expect(partnerService.get).toHaveBeenCalledWith(1);
  });

  it('should fail to get partner by id', async () => {
    jest
      .spyOn(partnerService, 'get')
      .mockImplementation(async (n: number) => undefined);

    await expect(controller.get({ id: 1 })).rejects.toThrow(NotFoundException);
  });

  it('shoudl create a new partner', async () => {
    jest
      .spyOn(partnerService, 'create')
      .mockImplementation(async (p: CreatePartnerDto) => mockPartner);

    expect(await controller.store(mockCreatePartnerDto)).toEqual(mockPartner);
  });
});

const mockCreatePartnerDto: CreatePartnerDto = {
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001', //CNPJ
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20],
        ],
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5],
        ],
      ],
    ],
  }, //Área de Cobertura
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741],
  }, //
};

const mockPartner: PartnerInterface = {
  id: 1,
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001', //CNPJ
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20],
        ],
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5],
        ],
      ],
    ],
  }, //Área de Cobertura
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741],
  }, // Localização do PDV
};
