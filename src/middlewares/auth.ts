import { env } from '@/config';
import { jwtPayload } from '@/modules/user/user.validation';
import { AppError, catchAsync } from '@/utils';
import jwt from 'jsonwebtoken';

export const verifyToken = catchAsync((req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Error();

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) throw err;

      req.user = jwtPayload.parse(decoded);

      next();
    });
  } catch (err) {
    throw new AppError(401, 'Unauthorized access');
  }
});
