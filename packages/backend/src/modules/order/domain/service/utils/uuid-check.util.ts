import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";

export const isUUIDRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export function isUUID(id: string){
    if (!isUUIDRegex.test(id)) {
        throw new Exception(ExceptionTypeEnum.BadRequest,'Invalid id');
    }
}