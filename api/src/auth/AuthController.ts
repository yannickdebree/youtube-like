import { Context } from "koa";
import { Service } from "typedi";
import { EmailFormatError, PasswordFormatError } from "../../../domain";
import { parseBody } from "../utils";
import { UnknowSignInMethodError } from "../utils/errors";
import { EMAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR, UNAUTHORIZED, UNKNOWN_SIGN_IN_METHOD } from "../utils/http-messages";
import { AuthService } from "./AuthService";
import { SignInDTO } from "./SignInDTO";

@Service()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    signIn(ctx: Context) {
        try {
            const dto = new SignInDTO(ctx.request.body);
            const account = this.authService.signIn(dto);

            if (!account) {
                ctx.response.status = 401;
                ctx.body = parseBody({
                    message: UNAUTHORIZED
                });
                return;
            }

            ctx.response.status = 200;
            ctx.body = parseBody({
                data: {
                    email: account.getEmail().getValue()
                }
            });
        } catch (err) {
            if (err instanceof EmailFormatError) {
                ctx.response.status = 422;
                ctx.body = parseBody({
                    message: EMAIL_FORMAT_ERROR
                });
                return;
            }
            if (err instanceof PasswordFormatError) {
                ctx.response.status = 422;
                ctx.body = parseBody({
                    message: PASSWORD_FORMAT_ERROR
                });
                return;
            }
            if (err instanceof UnknowSignInMethodError) {
                ctx.response.status = 400;
                ctx.body = parseBody({
                    message: UNKNOWN_SIGN_IN_METHOD
                });
                return;
            }
        }
    }
}