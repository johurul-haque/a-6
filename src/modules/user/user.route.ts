import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { getUserData, loginUser, registerUser } from './user.controller';
import { loginPayload, userSchema } from './user.validation';

const router = Router();

router.post('/register', validateRequest(userSchema), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

router.get('/profile', verifyToken, getUserData);

export const UserRoutes = router;
