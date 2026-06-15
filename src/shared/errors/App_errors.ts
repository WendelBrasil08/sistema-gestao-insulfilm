export class AppError extends Error {
    public readonly statusCode: number;
    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode

        Object.setPrototypeOf(this, AppError.prototype)
    }
}

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = " Nâo autorizado") {
        super(message, 401)
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Sem permissão para realizar essa operação") {
        super(message, 403)
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409)
        Object.setPrototypeOf(this, ConflictError.prototype)
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 422)
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}