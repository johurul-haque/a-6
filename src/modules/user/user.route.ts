import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { registerUser } from './user.controller';
import { userSchema } from './user.validation';

const router = Router();

router.post('/register', validateRequest(userSchema), registerUser);

export const UserRoutes = router;
