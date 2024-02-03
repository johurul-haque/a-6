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
import { loginPayload, userSchema } from './user.validation';

const router = Router();

router.post('/register', validateRequest(userSchema), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

router.get('/logout', verifyToken, logoutUser);

router.get('/profile', verifyToken, getUserData);

router.get('/profile/delete', verifyToken, deleteUser);

export const UserRoutes = router;
