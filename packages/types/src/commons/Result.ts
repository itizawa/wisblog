export type Result<T> = Success<T> | Failure;

export type Success<T> = {
  data: T;
  isSuccess: true;
  isFailure: false;
};

export type Failure = {
  errorMessage: string;
  isSuccess: false;
  isFailure: true;
};
