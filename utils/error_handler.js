class ErrorHandler extends Error
{
  constructor(message, name, code = null) {
    super();
    this.message = message;
    this.name = name;
    if(code && typeof code === 'number')
      this.statusCode = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;