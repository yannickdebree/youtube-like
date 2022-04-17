export class EmptyCommentError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, EmptyCommentError.prototype);
    }
}