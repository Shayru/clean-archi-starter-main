import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';

export class GetOrdersAllService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersAll(): Promise<Order[]> {
    return await this.orderRepository.findOrders();
  }
}
