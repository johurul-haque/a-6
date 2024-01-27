import { Router } from 'express';
import { UserRoutes } from './modules/user/user.route';

const router = Router();

router.use('/', UserRoutes);

export default router;
