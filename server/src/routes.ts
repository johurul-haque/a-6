import { Router } from 'express';
import { ProductRoutes } from './modules/product/product.route';
import { SalesRoutes } from './modules/sales/sales.route';
import { UserRoutes } from './modules/user/user.route';

const router = Router();

router.use('/', [UserRoutes, SalesRoutes]);
router.use('/products', ProductRoutes);

export default router;
