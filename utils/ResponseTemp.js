class ResponseTemp {
  constructor(success, message, errorCode, data, meta) {
    (this.errorCode = errorCode),
      (this.message = message),
      (this.success = success),
      (this.content = {
       meta,data
      });
  }
}

module.exports = ResponseTemp;
