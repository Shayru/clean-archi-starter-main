import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";
import { isUUID } from "class-validator";

export default class DeleteOrderService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {
    }

    async deleteOrder(id: string): Promise<void> {
        //test if orderId is correctUUID format
        isUUID

        const order = await this.orderRepository.findOneById(id);

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `No order for id : ${id}`);
        }

        await this.orderRepository.delete({ id: id });
    }
}