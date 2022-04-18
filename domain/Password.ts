import { PasswordFormatError } from './errors'

export class Password {
    constructor(private readonly value: string) {
        if (!value || value.length < 8) {
            throw new PasswordFormatError()
        }
    }

    getValue() {
        return this.value
    }
}
