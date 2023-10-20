import Order from "@src/modules/order/domain/model/entity/order.orm-entity";
import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import {OrderStatusEnum} from "@src/modules/order/domain/model/const/order-status.enum";
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";

export default class UpdateOrderStatusToPaidService {
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {
    }

    async updateOrderStatusToPaid(id: string): Promise<Order> {
        //test if orderId is correctUUID format
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!isUUID.test(id)) {
            throw new Exception(ExceptionTypeEnum.BadRequest,'Invalid id');
        }

        const order = await this.ordersRepository.findOneById(id);

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `No order for id : ${id}`);
        }

        order.status = OrderStatusEnum.Paid;
        return await this.ordersRepository.save(order);

    }
}