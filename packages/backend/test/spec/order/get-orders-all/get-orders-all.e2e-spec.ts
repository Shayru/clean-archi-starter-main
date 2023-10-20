import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get All Orders', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return all orders', async () => {
    const getOrdersResponse = await request(app.getHttpServer()).get('/api/orders/');

    expect(getOrdersResponse.status).toBe(200);
  });

  it('Should return 404 if route is invalid', async () => {
    const getOrdersResponse = await request(app.getHttpServer()).get('/api/orders/test');

    expect(getOrdersResponse.status).toBe(404);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});