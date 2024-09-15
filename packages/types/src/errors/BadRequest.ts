import { BaseError } from './BaseError';

export class BadRequest extends BaseError {
  code = 400;
}
