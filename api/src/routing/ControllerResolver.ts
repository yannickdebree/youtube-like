import { Context, Next } from "koa";
import { Service } from "typedi";
import { Account, Email, Password } from "../../../domain";
import { ControllerParams } from "./ControllerParams";
import { Response } from "./Response";

@Service()
export class ControllerResolver {
    run<T>(controllerHandler: (params: ControllerParams) => Response<T> | undefined) {
        return function (context: Context, next: Next) {
            let response = new Response({ status: 500 });

            try {
                const responseFromController = controllerHandler({ context, connectedAccount: new Account(new Email("test@test.com"), new Password("$testtest")) });

                if (!!responseFromController) {
                    response = responseFromController;
                }
            } catch (err) {
                if (process.env.NODE_ENV !== "production") {
                    console.warn(err);
                }
            } finally {
                context.body = response.body;
                context.response.status = response.status;

                next();
            }
        }
    }
}