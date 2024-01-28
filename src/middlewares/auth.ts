import { env } from '@/config';
import { jwtPayload } from '@/modules/user/user.validation';
import { catchAsync } from '@/utils';
import jwt from 'jsonwebtoken';

export const verifyToken = catchAsync((req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader || !bearerHeader.startsWith('Bearer')) throw new Error();

    // Extract the token by removing the "Bearer " prefix
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) throw err;

      req.jwtPayload = jwtPayload.parse(decoded);

      next();
    });
  } catch (err) {
    res.redirect(`${env.CLIENT_DOMAIN}/login`);
    // throw new AppError(401, 'Unauthorized access');
  }
});
