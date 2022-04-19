import { Email, Password } from '../../domain';
import { UnknowSignInMethodError } from '../../utils/errors';

interface SignInDTOParams {
    email: string;
    password: string;
}

export class SignInDTO {
    public readonly email?: Email
    public readonly password?: Password

    constructor(body: SignInDTOParams) {
        const { email, password } = body;

        // TODO: implement others sign-in methods check
        if (!email || !password) {
            throw new UnknowSignInMethodError()
        }

        this.email = new Email(email)
        this.password = new Password(password)
    }
}
