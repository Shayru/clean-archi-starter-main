import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }
  
  async findOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    return await query.getMany();
  }

  
  async findOrdersBeforeDate(date: Date): Promise<Order[]> {

    const query = this.createQueryBuilder('order');
    query.where('order.createdAt < :date', { date: date });

    return await query.getMany();
  }

  async findOrdersAfterDate(date: Date): Promise<Order[]> {

    const query = this.createQueryBuilder('order');
    query.where('order.createdAt > :date', { date: date });

    return await query.getMany();
  }

  async findOrdersByCustomer(customerId: string): Promise<Order[]> {

    const query = this.createQueryBuilder('order');
    query.where('order.customer = :customerId', { customerId: customerId });

    return await query.getMany();
  }


  async findOneById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :id', { id: id });

    return await query.getOne();
  }
  
}
