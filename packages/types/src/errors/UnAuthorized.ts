import { BaseError } from './BaseError';

export class UnAuthorized extends BaseError {
  code = 401;
}
