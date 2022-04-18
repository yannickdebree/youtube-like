export class UnknowSignInMethodError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, UnknowSignInMethodError.prototype)
    }
}
