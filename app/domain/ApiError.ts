export type ApiErrorType = {
  status: number;
  error: string;
  code: string;
  message: string;
  timestamp: string;
};

export class ApiError extends Error implements ApiErrorType {
  public status: number;
  public error: string;
  public code: string;
  public message: string;
  public timestamp: string;

  constructor(args: Omit<ApiErrorType, "timestamp"> & Partial<Pick<ApiErrorType, "timestamp">>) {
    super(args.message);

    this.status = args.status;
    this.error = args.error;
    this.code = args.code;
    this.message = args.message;
    this.timestamp = args.timestamp ?? new Date().toISOString();
  }
}