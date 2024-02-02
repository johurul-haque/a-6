import { env } from '@/config';
import { jwtPayload } from '@/modules/user/user.validation';
import { AppError, catchAsync } from '@/utils';
import jwt from 'jsonwebtoken';

export const verifyToken = catchAsync((req, res, next) => {
  try {

    const bearerHeader: string = req.cookies.token || req.headers.authorization;

    if (!bearerHeader || !bearerHeader.startsWith('Bearer')) throw new Error();

    // Extract the token by removing the "Bearer " prefix
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) throw err;

      req.jwtPayload = jwtPayload.parse(decoded);

      next();
    });
  } catch (err) {
    throw new AppError(401, 'Unauthorized access.');
  }
});
