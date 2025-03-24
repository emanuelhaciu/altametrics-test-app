
export class HTTPException extends Error {
    status: number;
    cause?: Error;

    constructor(status: number, message: string, cause?: Error) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.cause = cause;

        // Maintains proper stack trace (only needed in V8 environments like Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            status: this.status,
            name: this.name,
            message: this.message,
            cause: this.cause ? this.cause.message : undefined,
        };
    }
}


// 400 Bad Request
class BadRequestError extends HTTPException {
    constructor(message: string = 'Bad Request', cause?: Error) {
        super(400, message, cause);
        this.name = 'BadRequestError';
    }
}

// 401 Unauthorized
class UnauthorizedError extends HTTPException {
    constructor(message: string = 'Unauthorized', cause?: Error) {
        super(401, message, cause);
        this.name = 'UnauthorizedError';
    }
}

// 403 Forbidden
class ForbiddenError extends HTTPException {
    constructor(message: string = 'Forbidden', cause?: Error) {
        super(403, message, cause);
        this.name = 'ForbiddenError';
    }
}

// 404 Not Found
class NotFoundError extends HTTPException {
    constructor(message: string = 'Not Found', cause?: Error) {
        super(404, message, cause);
        this.name = 'NotFoundError';
    }
}

// 409 Conflict
class ConflictError extends HTTPException {
    constructor(message: string = 'Conflict', cause?: Error) {
        super(409, message, cause);
        this.name = 'ConflictError';
    }
}

// 500 Internal Server Error
class InternalServerError extends HTTPException {
    constructor(message: string = 'Internal Server Error', cause?: Error) {
        super(500, message, cause);
        this.name = 'InternalServerError';
    }
}

// 502 Bad Gateway
class BadGatewayError extends HTTPException {
    constructor(message: string = 'Bad Gateway', cause?: Error) {
        super(502, message, cause);
        this.name = 'BadGatewayError';
    }
}

// 503 Service Unavailable
class ServiceUnavailableError extends HTTPException {
    constructor(message: string = 'Service Unavailable', cause?: Error) {
        super(503, message, cause);
        this.name = 'ServiceUnavailableError';
    }
}

// 504 Gateway Timeout
class GatewayTimeoutError extends HTTPException {
    constructor(message: string = 'Gateway Timeout', cause?: Error) {
        super(504, message, cause);
        this.name = 'GatewayTimeoutError';
    }
}

export {
    BadGatewayError,
    BadRequestError,
    ConflictError,
    ForbiddenError,
    GatewayTimeoutError,
    InternalServerError,
    NotFoundError,
    ServiceUnavailableError,
    UnauthorizedError
};

