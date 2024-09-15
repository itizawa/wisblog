import { BaseError } from './BaseError';

export class ResourceNotFound extends BaseError {
  code = 404;
}
