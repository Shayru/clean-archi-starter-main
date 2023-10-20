import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';

export class GetOrdersBeforeDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersBeforeDate(date): Promise<Order[]> {
    return await this.orderRepository.findOrdersBeforeDate(date);
    
  }
}
