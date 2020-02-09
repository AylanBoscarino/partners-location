import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PartnerController } from '../src/partner/partner.controller';
import { PartnerService } from '../src/partner/partner.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DatabaseModule } from '../src/database/database.module';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    process.env.DATABASE_URI = await mongod.getConnectionString();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [PartnerController],
      providers: [
        PartnerService,
        {
          provide: getModelToken('Partner'),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });
});
