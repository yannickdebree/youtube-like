export class CommentFormatError extends Error {
    constructor() {
        super()
        Object.setPrototypeOf(this, CommentFormatError.prototype)
    }
}
