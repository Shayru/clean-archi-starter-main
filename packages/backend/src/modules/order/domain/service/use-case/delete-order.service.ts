import {OrderRepositoryInterface} from "@src/modules/order/domain/port/db/order.repository.interface";
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";

export default class DeleteOrderService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {
    }

    async deleteOrder(id: string): Promise<void> {
        //test if orderId is correctUUID format
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!isUUID.test(id)) {
            throw new Exception(ExceptionTypeEnum.BadRequest,'Invalid id');
        }

        const order = await this.orderRepository.findOneById(id);

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `No order for id : ${id}`);
        }

        await this.orderRepository.delete({ id: id });
    }
}