import { Context } from "koa";
import Router from "koa-router";
import { Container } from "typedi";
import { AccountsController } from "./accounts";
import { AuthController } from "./auth/AuthController";

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

const accountsController = Container.get(AccountsController);
const authController = Container.get(AuthController);

const router = new Router()
    .post('/accounts', runController(ctx => accountsController.create(ctx)))
    .post('/auth', runController(ctx => authController.signIn(ctx)));

export default router;