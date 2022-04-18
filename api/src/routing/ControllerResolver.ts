import jwt from 'jsonwebtoken';
import { Context, Next } from "koa";
import { Service } from "typedi";
import { Account, Email } from "../../../domain";
import { AccountsService } from "../accounts";
import { API_SECRET } from '../utils/environment';
import { UNAUTHORIZED } from '../utils/http-messages';
import { ControllerParams } from "./ControllerParams";
import { Response } from "./Response";

@Service()
export class ControllerResolver {
    constructor(
        private readonly accountsService: AccountsService
    ) { }

    run<T>(controllerHandler: (params: ControllerParams) => Response<T> | undefined) {
        return (context: Context, next: Next) => {
            let response = new Response({ status: 500 });

            const connectedAccount = this.getConnectedAccount(context);

            try {
                const responseFromController = controllerHandler({ context, connectedAccount });

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
                if (response.status === 401 && !response.body?.message) {
                    context.response.body = { message: UNAUTHORIZED }
                }
                next();
            }
        }
    }

    getConnectedAccount(context: Context) {
        let connectedAccount: Account | undefined;

        const authorization = context.headers.authorization;
        if (authorization) {
            let payload = jwt.verify(authorization, API_SECRET) as jwt.JwtPayload;
            const email = payload.email.value;
            if (!!email) {
                connectedAccount = this.accountsService.findByEmail(new Email(email));
            }
        }

        return connectedAccount;
    }
}