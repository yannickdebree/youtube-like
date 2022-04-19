export class PasswordFormatError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, PasswordFormatError.prototype)
    }
}
