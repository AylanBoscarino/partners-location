import { Test, TestingModule } from '@nestjs/testing';
import { PartnerService } from './partner.service';
import { getModelToken } from '@nestjs/mongoose';
import { createMockFactory, PartialMockType } from './util/tests';
import {
  PartnerInterface,
  PartnerInterfaceDocument,
} from './partner.interface';
import { Model } from 'mongoose';

const partinerModelMockFactory = createMockFactory<
  Model<PartnerInterfaceDocument>
>({
  find: jest.fn(entity => new Promise(resolve => resolve(entity))),
  findById: jest.fn(entity => new Promise(resolve => resolve(entity))),
  create: jest.fn(entity => new Promise(resolve => resolve(entity))),
});

describe('PartnerService', () => {
  let service: PartnerService;
  let modelMock: PartialMockType<Model<PartnerInterfaceDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnerService,
        {
          provide: getModelToken('Partner'),
          useFactory: partinerModelMockFactory,
        },
      ],
    }).compile();

    service = module.get<PartnerService>(PartnerService);
    modelMock = module.get(getModelToken('Partner'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all partners', async () => {
    modelMock.find.mockReturnValue(mockedData);
    expect(await service.find()).toEqual(mockedData);
    expect(modelMock.find).toBeCalled();
  });

  it('should get partner by ID', async () => {
    modelMock.findById.mockReturnValue(mockedData[0]);
    expect(await service.get(1)).toEqual(mockedData[0]);
    expect(modelMock.findById).toBeCalledWith(1);
  });
});

const mockedData: PartnerInterface[] = [
  {
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
    },
    address: {
      type: 'Point',
      coordinates: [-46.57421, -21.785741],
    },
  },
];