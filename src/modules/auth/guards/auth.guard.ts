/* eslint-disable prettier/prettier */
import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
        super()
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        req.body = ctx.getArgs().loginUserInput;
        return req;
    }
}