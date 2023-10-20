import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Orders By Customer', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('Should return empty array if for a valid customer order with no orders', async () => {
    const getOrdersByCustomerResponse = await request(app.getHttpServer()).get('/api/orders/customer/jeanpierre');

    expect(getOrdersByCustomerResponse.status).toBe(200);
    expect(getOrdersByCustomerResponse.body).toEqual([]);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});