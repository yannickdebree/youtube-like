import { Context } from "koa";
import Router from "koa-router";
import { Container } from "typedi";
import { AccountsController } from "./accounts";

const accountsController = Container.get(AccountsController);

function runController<T>(controllerRunner: (ctx: Context) => T) {
    return function (ctx: Context) {
        try {
            controllerRunner(ctx);
        } catch (err) {
            console.warn(err);
            ctx.response.status = 500;
        }
    }
}

const router = new Router().post('/accounts', runController(ctx => accountsController.create(ctx)));

export default router;