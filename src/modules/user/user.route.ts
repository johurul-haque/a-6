import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import {
  deleteUser,
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
} from './user.controller';
import {
  deleteAccountPayload,
  loginPayload,
  logoutPayload,
  userSchema,
} from './user.validation';

const router = Router();

router.post('/register', validateRequest(userSchema), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

router.get('/profile', verifyToken(), getUserData);

router.post(
  '/logout',
  [verifyToken(), validateRequest(logoutPayload)],
  logoutUser
);
router.post(
  '/profile/delete',
  [verifyToken(), validateRequest(deleteAccountPayload)],
  deleteUser
);

export const UserRoutes = router;
