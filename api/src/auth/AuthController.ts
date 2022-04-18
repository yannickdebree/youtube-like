import { Service } from "typedi";
import { EmailFormatError, PasswordFormatError } from "../../../domain";
import { ControllerParams, Response } from "../routing";
import { UnknowSignInMethodError } from "../utils/errors";
import { EMAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR, UNAUTHORIZED, UNKNOWN_SIGN_IN_METHOD } from "../utils/http-messages";
import { AuthService } from "./AuthService";
import { SignInDTO } from "./SignInDTO";

@Service()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    signIn({ context }: ControllerParams) {
        try {
            const dto = new SignInDTO(context.request.body);
            const account = this.authService.signIn(dto);

            if (!account) {
                return new Response({
                    status: 401,
                    body: {
                        message: UNAUTHORIZED
                    }
                });
            }

            return new Response({
                status: 200,
                body: {
                    data: {
                        email: account?.getEmail().getValue()
                    }
                }
            });
        } catch (err) {
            if (err instanceof EmailFormatError) {
                return new Response({
                    status: 422,
                    body: {
                        message: EMAIL_FORMAT_ERROR
                    }
                });
            }
            if (err instanceof PasswordFormatError) {
                return new Response({
                    status: 422,
                    body: {
                        message: PASSWORD_FORMAT_ERROR
                    }
                })
            }
            if (err instanceof UnknowSignInMethodError) {
                return new Response({
                    status: 400,
                    body: {
                        message: UNKNOWN_SIGN_IN_METHOD
                    }
                });
            }
        }
    }
}