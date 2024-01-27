import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { loginUser, registerUser } from './user.controller';
import { loginPayload, userSchema } from './user.validation';

const router = Router();

router.post('/register', validateRequest(userSchema), registerUser);
router.post('/login', validateRequest(loginPayload), loginUser);

export const UserRoutes = router;
