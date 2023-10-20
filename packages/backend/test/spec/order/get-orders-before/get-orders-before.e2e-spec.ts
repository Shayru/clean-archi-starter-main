import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Orders Before Date', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return orders before given date', async () => {
    const getOrdersDateBeforeResponse = await request(app.getHttpServer()).get('/api/orders/before/2023-09-19T14:24:18.287Z');

    expect(getOrdersDateBeforeResponse.status).toBe(200);
  });

  it('Should return 500 if date is invalid', async () => {
    const getOrdersDateBeforeResponse = await request(app.getHttpServer()).get('/api/orders/before/20230919');

    expect(getOrdersDateBeforeResponse.status).toBe(500);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});