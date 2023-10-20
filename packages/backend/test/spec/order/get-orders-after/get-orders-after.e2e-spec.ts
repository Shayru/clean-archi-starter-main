import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Orders After Date', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return orders after given date', async () => {
    const getOrdersAfterDateResponse = await request(app.getHttpServer()).get('/api/orders/after/2023-09-19T14:24:18.287Z');

    expect(getOrdersAfterDateResponse.status).toBe(200);
  });

  it('Should return 500 if date is invalid', async () => {
    const getOrdersDateAfterResponse = await request(app.getHttpServer()).get('/api/orders/after/test');

    expect(getOrdersDateAfterResponse.status).toBe(500);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});