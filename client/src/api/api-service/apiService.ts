// src/api/services/apiService.ts
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { BadGatewayError, BadRequestError, ConflictError, ForbiddenError, GatewayTimeoutError, HTTPException, InternalServerError, NotFoundError, ServiceUnavailableError, UnauthorizedError } from './error-exceptions';

interface ErrorResponse {
    message?: string;
    [key: string]: any; // For any other properties that might exist
  }

// More specific types instead of unknown
export type ApiData = Record<string, any> | any[];
export type QueryParams = Record<string, string | number | boolean | null | undefined>;
export type RouteParams = Record<string, string | number>;

export interface IApiService {
    replaceRouteParams(route: string, params: RouteParams): string;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: ApiData, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: ApiData, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

class ApiService implements IApiService {
    public api = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 30000, // Adding a default timeout
    });

    constructor() {
        // Add request interceptors 
        this.api.interceptors.request.use(
            (config) => {
                // Get token from localStorage
                const token = localStorage.getItem('auth_token');
                
                // Add token to headers if available
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add response interceptors for handling token expiry
        this.api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                // Redirect to login if unauthorized
                if (error.response?.status === 401) {
                    this.handleUnauthorizedError();
                }
                return Promise.reject(error);
            }
        );
    }

    // Extracted for easier testing/mocking
    protected handleUnauthorizedError(): void {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }

    protected handleHttpError(error: AxiosError<ErrorResponse>): never {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message;
        
        switch (status) {
            case 400: throw new BadRequestError(message, error);
            case 401: throw new UnauthorizedError(message, error);
            case 403: throw new ForbiddenError(message, error);
            case 404: throw new NotFoundError(message, error);
            case 409: throw new ConflictError(message, error);
            case 500: throw new InternalServerError(message, error);
            case 502: throw new BadGatewayError(message, error);
            case 503: throw new ServiceUnavailableError(message, error);
            case 504: throw new GatewayTimeoutError(message, error);
            default: throw new HTTPException(status, message, error);
        }
      }

    public replaceRouteParams(route: string, params: RouteParams = {}): string {
        return route.replace(/:\w+/g, match => {
            const paramKey = match.substring(1);
            return params[paramKey] !== undefined ? String(params[paramKey]) : match;
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.get<T>(url, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.handleHttpError(error);
            }
            throw error;
        }
    }

    public async post<T>(
        url: string,
        data?: ApiData,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response = await this.api.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.handleHttpError(error);
            }
            throw error;
        }
    }

    public async put<T>(
        url: string,
        data?: ApiData,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response = await this.api.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.handleHttpError(error);
            }
            throw error;
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.delete<T>(url, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.handleHttpError(error);
            }
            throw error;
        }
    }
}

export const apiService = new ApiService();