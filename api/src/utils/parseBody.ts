interface ResponseBody<T> {
    message?: string;
    data?: T;
}

export function parseBody<T>(body: ResponseBody<T>) {
    return body;
}