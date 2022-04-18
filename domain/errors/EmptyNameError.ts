export class EmptyNameError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, EmptyNameError.prototype);
    }
}