import { NextFunction, Request, RequestHandler, Response } from 'express';

type ReqBody = Record<string, unknown>;
type ReqParams = Record<string, string>;

export function catchAsync<T extends ReqBody = any>(
  fn: RequestHandler<Record<string, string>, {}, T>
) {
  return (
    req: Request<ReqParams, {}, T>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}
