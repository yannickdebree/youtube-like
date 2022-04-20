import { Service } from 'typedi'
import { EmailFormatError, PasswordFormatError } from '../../domain'
import { ControllerParams, Response } from '../../core/routing'
import { UnknowSignInMethodError } from '../../utils/errors'
import {
    EMAIL_FORMAT_ERROR,
    PASSWORD_FORMAT_ERROR,
    UNKNOWN_SIGN_IN_METHOD
} from '../../utils/http-messages'
import { AuthService } from './AuthService'
import { SignInDTO } from './SignInDTO'

@Service()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    async signIn({ context }: ControllerParams) {
        try {
            const dto = new SignInDTO(context.request.body)
            const payload = await this.authService.signIn(dto);

            if (!payload) {
                return new Response({
                    status: 401,
                })
            }

            return new Response({
                status: 200,
                body: {
                    data: payload,
                },
            })
        } catch (err) {
            if (err instanceof EmailFormatError) {
                return new Response({
                    status: 422,
                    body: {
                        message: EMAIL_FORMAT_ERROR,
                    },
                })
            }
            if (err instanceof PasswordFormatError) {
                return new Response({
                    status: 422,
                    body: {
                        message: PASSWORD_FORMAT_ERROR,
                    },
                })
            }
            if (err instanceof UnknowSignInMethodError) {
                return new Response({
                    status: 400,
                    body: {
                        message: UNKNOWN_SIGN_IN_METHOD,
                    },
                })
            }
            throw err;
        }
    }
}
