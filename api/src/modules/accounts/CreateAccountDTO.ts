import { Email, EmailFormatError, Password, PasswordFormatError } from '../../../../domain';

interface CreateAccountDTOParams {
    email: string;
    password: string;
}

export class CreateAccountDTO {
    public readonly email: Email
    public readonly password: Password

    constructor(body: CreateAccountDTOParams) {
        const { email, password } = body;
        if (!email) {
            throw new EmailFormatError();
        }
        if (!password) {
            throw new PasswordFormatError()
        }
        this.email = new Email(email)
        this.password = new Password(password)
    }
}
