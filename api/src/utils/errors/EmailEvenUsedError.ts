export class EmailEvenUsedError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, EmailEvenUsedError.prototype)
    }
}
