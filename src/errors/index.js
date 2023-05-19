class CustomError extends Error {
  constructor(cause) {
    super();
    this.name = this.constructor.name;
    this.cause = cause;
  }
}

class HttpError extends CustomError {
  constructor(cause) {
    super(cause);
  }
}

class BadRequest extends HttpError {
  constructor(cause) {
    super(cause);
    this.statusCode = 400;
  }
}

class Unauthorized extends HttpError {
  constructor(cause) {
    super(cause);
    this.statusCode = 401;
  }
}

class Forbidden extends HttpError {
  constructor(cause) {
    super(cause);
    this.statusCode = 403;
  }
}

class NotFound extends HttpError {
  constructor(cause) {
    super(cause);
    this.statusCode = 404;
  }
}

class ServerError extends HttpError {
  constructor(cause) {
    super(cause);
    this.statusCode = 500;
  }
}

class JwtError extends Unauthorized {
  constructor(cause) {
    super(cause);
  }
}

class ValidationError extends Error {
  constructor() {}
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    this.property = property;
  }
}

export { BadRequest, Unauthorized, Forbidden, NotFound, ServerError, JwtError, ValidationError, PropertyRequiredError };
