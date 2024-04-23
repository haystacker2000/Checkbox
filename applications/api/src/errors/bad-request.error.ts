import { HttpError } from './http-error.error';

export class HttpBadRequest extends HttpError {
  constructor(message?: string) {
    super(400, message);
  }
}
