import Order from '../../domain/model/entity/order.orm-entity';
import { GetOrdersAllService } from '../../domain/service/use-case/get-orders-all.service';
import { GetOrdersByCustomerService } from '../../domain/service/use-case/get-orders-by-customer.service';
import { GetOrdersBeforeDateService } from '../../domain/service/use-case/get-orders-before-date.service';
import { GetOrdersAfterDateService } from '../../domain/service/use-case/get-orders-after-date.service';
import { Controller, Get, Param, Patch, Post, Delete, Body } from '@nestjs/common';
import UpdateOrderStatusToPaidService from '../../domain/service/use-case/update-order-status-to-paid.service';
import UpdateOrderStatusToCancelledService from '../../domain/service/use-case/update-order-status-to-cancelled.service';
import DeleteOrderService from '../../domain/service/use-case/delete-order.service';
import CreateOrderService from '../../domain/service/use-case/create-order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('/orders')
export default class OrderController {
  constructor (
      private readonly getOrdersAllService: GetOrdersAllService,
      private readonly getOrdersBeforeDateService: GetOrdersBeforeDateService,
      private readonly getOrdersAfterDateService: GetOrdersAfterDateService,
      private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
      private readonly updateOrderStatusToPaidService: UpdateOrderStatusToPaidService,
      private readonly updateOrderStatusToCancelledService: UpdateOrderStatusToCancelledService,
      private readonly deleteOrderService: DeleteOrderService,
      private readonly createOrderService: CreateOrderService,
  ){}

  @Get('/')
  async getOrdersAll(): Promise<Order[]> {
    return await this.getOrdersAllService.getOrdersAll();
  }

  @Get('/before/:date')
  async getOrdersBeforeDate(@Param('date') date: Date): Promise<Order[]> {
    return await this.getOrdersBeforeDateService.getOrdersBeforeDate(date);
  }

  @Get('/after/:date')
  async getOrdersAfterDate(@Param('date') date: Date): Promise<Order[]> {
    return await this.getOrdersAfterDateService.getOrdersAfterDate(date);
  }
  
  @Get('/customer/:name')
  async getOrdersByCustomer(@Param('name') name: string): Promise<Order[]> {
    return await this.getOrdersByCustomerService.getOrdersByCustomer(name);
  }

  @Patch('/:id/paid')
  async updateOrderStatusToPaid(@Param('id') id: string): Promise<Order> {
      return await this.updateOrderStatusToPaidService.updateOrderStatusToPaid(id);
  }

  @Patch('/:id/cancel')
  async updateOrderStatusToCancelled(@Param('id') id: string): Promise<Order> {
      return await this.updateOrderStatusToCancelledService.updateOrderStatusToCancelled(id);
  }

  @Delete('/:id/delete')
  async deleteOrder(@Param('id') id: string): Promise<void> {
      return await this.deleteOrderService.deleteOrder(id);
  }

  @Post('/')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    await this.createOrderService.createOrder(createOrderDto);
  }

}
