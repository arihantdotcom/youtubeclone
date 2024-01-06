class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
