export class EmailFormatError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, EmailFormatError.prototype)
    }
}
