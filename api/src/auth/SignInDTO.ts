import { Email, Password } from '../../../domain'
import { UnknowSignInMethodError } from '../utils/errors'

export class SignInDTO {
    public readonly email?: Email
    public readonly password?: Password

    constructor(body: any) {
        const { email, password } = body

        if (!!email && !!password) {
            this.email = new Email(email)
            this.password = new Password(password)
        } else {
            throw new UnknowSignInMethodError()
        }
    }
}
