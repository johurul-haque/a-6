import { catchAsync } from '@utils';
import { AnyZodObject } from 'zod';

export function validateRequest(schema: AnyZodObject) {
  return catchAsync(async (req, res, next) => {
    req.body = await schema.parseAsync(req.body);

    next();
  });
}
