import { HttpServer, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateChallengeDto } from '../src/challenges/dto/create-challenge.dto';
import { Kyu } from '../src/challenges/types/kyu.enum';
import { Level } from '../src/challenges/types/level.enum';

describe('Challenges (e2e)', () => {
  let app: INestApplication;
  let server: HttpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    app.close();
  });

  describe('POST /challenges', () => {
    it('returns 201 and the created challenge', async () => {
      const requestBody: CreateChallengeDto = {
        name: 'Multiply',
        url: 'https://some-challenge.come/challenges/1',
        kyu: Kyu.EIGHT,
        level: Level.BEGINNER,
      };

      const res = await request(server)
        .post(encodeURI(`/challenges`))
        .send(requestBody);

      expect(res.status).toEqual(201);
      expect(res.body.challenge).toMatchObject(requestBody);
    });
  });

  describe('GET /challenges', () => {
    it('returns an array of challenges by kyu', async () => {
      const kyus: Kyu[] = [Kyu.ONE, Kyu.TWO];

      const res = await request(server)
        .get(encodeURI(`/challenges`))
        .query({ kyus: '1-kyu' });

      expect(res.status).toEqual(200);
      expect(res.body.challenges).toBeDefined();
    });
  });
});
