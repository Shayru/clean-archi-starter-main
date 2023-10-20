import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import Order from '../../model/entity/order.orm-entity';

export interface OrderRepositoryInterface extends RepositoryInterface {
    findOrders(): Promise<Order[]>;
    findOrdersBeforeDate(date: Date): Promise<Order[]>;
    findOrdersAfterDate(date: Date): Promise<Order[]>;
    findOrdersByCustomer(customerName: string): Promise<Order[]>;
    findOneById(id: string): Promise<Order>;
}
