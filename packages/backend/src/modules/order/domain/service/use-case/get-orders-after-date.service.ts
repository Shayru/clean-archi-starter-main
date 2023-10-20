import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';

export class GetOrdersAfterDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersAfterDate(date): Promise<Order[]> {
    return await this.orderRepository.findOrdersAfterDate(date);
  }
}
