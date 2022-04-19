import { EmailFormatError } from './errors'

const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export class Email {
    constructor(private readonly value: string) {
        if (value.length === 0 || !value.match(emailRegex)) {
            throw new EmailFormatError()
        }
    }

    getValue() {
        return this.value
    }

    isEquals(email: Email) {
        return this.value === email.getValue()
    }
}
