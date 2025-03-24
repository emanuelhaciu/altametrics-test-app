export class ApiResponse<T> {
    data: T;
    error?: string;
    message: string;
}