import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { invalidCustomerCaractere, invalidCustomerNumber, orders, validCustomer } from '../utils/order-mock.fixture';
import { GetOrdersByCustomerService } from './get-orders-by-customer.service';

describe('verifier GetOrdersByCustomer', () => {
  let orderRepositoryMock: OrderRepositoryInterface;

  beforeAll(() => {
    orderRepositoryMock = {
        findOrdersByCustomer: () => orders[0],
    } as unknown as OrderRepositoryInterface;
  });

  it('Should return orders for a valid customer name', async () => {

    const getOrdersByCustomerService = new GetOrdersByCustomerService(orderRepositoryMock);

    const result = await getOrdersByCustomerService.getOrdersByCustomer(validCustomer);

    expect(result).toEqual(orders[0]);
  });

  it('Should throw an exception if the name is 5 or less characters long', async () => {

    const getOrdersByCustomerService = new GetOrdersByCustomerService(orderRepositoryMock);

    expect(() => getOrdersByCustomerService.getOrdersByCustomer(invalidCustomerCaractere)).rejects.toThrow(Exception);
  });

  it('Should throw an exception if the name contains numbers', async () => {

    const getOrdersByCustomerService = new GetOrdersByCustomerService(orderRepositoryMock);

    expect(() => getOrdersByCustomerService.getOrdersByCustomer(invalidCustomerCaractere)).rejects.toThrow(Exception);
  });
});