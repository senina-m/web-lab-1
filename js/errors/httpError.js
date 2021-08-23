function httpError(message) {
    this.name = 'httpError';
    this.message = message || 'Something gone wrong with http connection or server';
    this.stack = (new Error()).stack;
}
httpError.prototype = Object.create(Error.prototype);
httpError.prototype.constructor = httpError;
