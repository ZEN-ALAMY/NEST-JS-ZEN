import { ExecutionContext, createParamDecorator } from "@nestjs/common";



export const CurretnUser = createParamDecorator(
    (data:never,context:ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)