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
import { CounterProvider } from '../counter/counter.provider';

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
        {
          provide: CounterProvider,
          useValue: {},
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

  it('should create a new partner', async () => {
    jest
      .spyOn(partnerService, 'create')
      .mockImplementation(async (p: CreatePartnerDto) => mockPartner);

    expect(await controller.store(mockCreatePartnerDto)).toEqual(mockPartner);
  });

  it('should search for nearest partner', async () => {
    jest
      .spyOn(partnerService, 'searchNearest')
      .mockImplementation(async (lng: number, lat: number) => mockPartner);
    await controller.search('12', '11');
    expect(partnerService.searchNearest).toHaveBeenCalledWith(12, 11);
  });

  it('should NOT search for nearest partner', async () => {
    jest
      .spyOn(partnerService, 'searchNearest')
      .mockImplementation(async (lng: number, lat: number) => undefined);
    await expect(controller.search('doze', 'onze')).rejects.toThrow(
      BadRequestException,
    );
    await expect(controller.search('12', '11')).rejects.toThrow(
      NotFoundException,
    );
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
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741],
  },
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
