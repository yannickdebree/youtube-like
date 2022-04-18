export class EmptyVideoSourceError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, EmptyVideoSourceError.prototype)
    }
}
