export class UidFormatError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, UidFormatError.prototype)
    }
}
