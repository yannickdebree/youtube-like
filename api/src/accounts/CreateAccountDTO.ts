import { Email, Password } from "../../../domain";

export class CreateAccountDTO {
    public readonly email: Email;
    public readonly password: Password

    constructor(body: any) {
        const { email, password } = body;
        this.email = new Email(email);
        this.password = new Password(password);
    }
}