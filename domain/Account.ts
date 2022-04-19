import { Email } from './Email'
import { Password } from './Password'

export class Account {
    constructor(private email: Email, private password: Password) { }

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }
}
