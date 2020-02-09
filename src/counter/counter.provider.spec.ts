import { Test, TestingModule } from '@nestjs/testing';
import { CounterProvider } from './counter.provider';
import { createMockFactory, PartialMockType } from '../util/tests';
import { Model, model } from 'mongoose';
import {
  CounterInterfaceDocument,
  CounterInterface,
} from './counter.interface';
import { getModelToken } from '@nestjs/mongoose';

const counterModelMockFactory = createMockFactory<
  Model<CounterInterfaceDocument>
>({
  create: jest.fn(entity => new Promise(resolve => resolve(entity))),
  findOneAndUpdate: jest.fn(entity => new Promise(resolve => resolve(entity))),
});

describe('CounterProvider', () => {
  let provider: CounterProvider;
  let modelMock: PartialMockType<Model<CounterInterfaceDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CounterProvider,
        {
          provide: getModelToken('Counter'),
          useFactory: counterModelMockFactory,
        },
      ],
    }).compile();

    provider = module.get<CounterProvider>(CounterProvider);
    modelMock = module.get(getModelToken('Counter'));
  });

  afterEach(() => {
    modelMock.findOneAndUpdate.mockReset();
    modelMock.create.mockReset();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should create sequence value', async () => {
    modelMock.create.mockImplementation(async (counter: CounterInterface) => ({
      id: counter.id,
      sequence_value: 0,
    }));

    await provider.createSequenceValue('mock_id');
    expect(modelMock.create).toHaveBeenCalledWith({
      id: 'mock_id',
      sequence_value: 0,
    });
  });

  it('should get next sequence value', async () => {
    modelMock.findOneAndUpdate.mockImplementation(async (...ad: any[]) => ({
      sequence_value: 11,
    }));
    expect(await provider.getNextSequenceValue('mock_id')).toBe(11);
    expect(modelMock.findOneAndUpdate).toBeCalledWith(
      {
        id: 'mock_id',
      },
      {
        $inc: { sequence_value: 1 },
      },
    );
  });

  it('sould not find sequence value, create one and call itself once', async () => {
    modelMock.create.mockReturnValue({ id: 'mock_id', sequence_value: 0 });
    modelMock.findOneAndUpdate.mockImplementationOnce(async () => undefined);
    modelMock.findOneAndUpdate.mockImplementationOnce(async () => ({
      id: 'mock_id',
      sequence_value: 1,
    }));

    expect(await provider.getNextSequenceValue('mock_id')).toEqual(1);

    expect(modelMock.create).toHaveBeenCalled();
    expect(modelMock.findOneAndUpdate).toHaveBeenCalledTimes(2);
  });
});
