class AppError extends Error {
  constructor(success, message, errorCode) {
    super(message);
    (this.errorCode = errorCode?errorCode:500),
      (this.message = message?message:"Unknown Error"),
      (this.success = success?success:false)
  }
}

module.exports = AppError;
