import { Test, TestingModule } from '@nestjs/testing';
import { PartnerService } from './partner.service';
import { getModelToken } from '@nestjs/mongoose';
import { createMockFactory, PartialMockType } from '../util/tests';
import {
  PartnerInterface,
  PartnerInterfaceDocument,
} from './partner.interface';
import { Model } from 'mongoose';
import { CounterInterfaceDocument } from '../counter/counter.interface';
import { CounterProvider } from '../counter/counter.provider';

const partnerModelMockFactory = createMockFactory<
  Model<PartnerInterfaceDocument>
>({
  find: jest.fn(entity => new Promise(resolve => resolve(entity))),
  findOne: jest.fn(entity => new Promise(resolve => resolve(entity))),
  create: jest.fn(entity => new Promise(resolve => resolve(entity))),
});

describe('PartnerService', () => {
  let service: PartnerService;
  let modelMock: PartialMockType<Model<PartnerInterfaceDocument>>;
  let counterProvider: CounterProvider;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnerService,
        {
          provide: getModelToken('Partner'),
          useFactory: partnerModelMockFactory,
        },
        {
          provide: CounterProvider,
          useValue: {
            getNextSequenceValue: jest.fn(async (id: string) => 1),
          },
        },
      ],
    }).compile();

    service = module.get<PartnerService>(PartnerService);
    modelMock = module.get(getModelToken('Partner'));
    counterProvider = module.get(CounterProvider);
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
    modelMock.findOne.mockReturnValue(mockedData[0]);
    expect(await service.get(1)).toEqual(mockedData[0]);
    expect(modelMock.findOne).toBeCalledWith({ id: 1 });
  });

  it('should create a new partner', async () => {
    modelMock.create.mockImplementation(async (args: PartnerInterface) => args);
    expect(await service.create(mockedData[0])).toEqual(mockedData[0]);
    expect(counterProvider.getNextSequenceValue).toHaveBeenCalled();
  });

  it('should build the correct query', async () => {
    modelMock.findOne.mockImplementation(async () => ({}));
    const expectedQuery = {
      coverageArea: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: [12, 11],
          },
        },
      },
      address: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [12, 11],
          },
        },
      },
    };
    await service.searchNearest(12, 11);
    expect(modelMock.findOne).toHaveBeenCalledWith(expectedQuery);
  });
});

const mockedData: PartnerInterface[] = [
  {
    id: 1,
    tradingName: 'Adega da Cerveja - Pinheiros',
    ownerName: 'Zé da Silva',
    document: '1432132123891/0001',
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
