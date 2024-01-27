import { NextFunction, Request, RequestHandler, Response } from 'express';

type ReqBody = Record<string, unknown>;

export function catchAsync<T extends ReqBody = any, P extends string = ''>(
  fn: RequestHandler<Record<P, string>, {}, T>
) {
  return (
    req: Request<Record<P, string>, {}, T>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}
