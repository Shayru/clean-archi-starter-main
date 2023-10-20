import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class GetOrdersByCustomerService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersByCustomer(name): Promise<Order[]> {
    const nombreDeCaractere = 5;
    if (name.length < nombreDeCaractere) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `Le nom : ${name} est inférieur à ${nombreDeCaractere} charactères`);
    }
    if (name.match(/\d+/g)) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `Le nom : ${name} contient des chiffres`);
    }
    return await this.orderRepository.findOrdersByCustomer(name);
  }
}