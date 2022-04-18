interface ResponseBody<T> {
    message?: string;
    data?: T;
}

export class Response<T> {
    public readonly status: number;
    public readonly body?: ResponseBody<T>;

    constructor(props: Response<T>) {
        this.status = props.status;
        this.body = props.body;
    }
}