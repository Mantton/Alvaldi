export class APIError extends Error {
  code: number = 400;
}

/**
 * Status Code 401, Unauthorized
 */
export class UnauthorizedRequestError extends APIError {
  constructor() {
    super("unauthorized");
    this.name = "UnauthorizedRequest";
    this.code = 401;
  }
}

/**
 * status code 403, Forbidden
 */
export class ForbiddenRequestError extends APIError {
  constructor() {
    super("forbidden");
    this.name = "forbidden";
    this.code = 403;
  }
}

/**
 * content violation error
 */

export class ContentViolationError extends APIError {
  constructor() {
    super("provided content violated content guidelines");
    this.name = "ContentViolation";
  }
}

/**
 * The requested resource/record does not exist
 */
export class RecordNotFoundError extends APIError {
  constructor() {
    super("not found");
    this.name = "Not Found";
    this.code = 404;
  }
}

export class BadRequestError extends APIError {
  constructor() {
    super("bad request");
    this.name = "Bad Request";
    this.code = 400;
  }
}
