export interface Response {
    status: number;
    payload: any;
}

export interface ErrorResponse extends Response {
    status: number;
    payload: {
        message: string;
    }
}