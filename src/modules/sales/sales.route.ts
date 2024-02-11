import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { sellProduct } from './sales.controller';
import { productSaleSchema } from './sales.validation';

const router = Router();

router.post(
  '/sell/:productId',
  [verifyToken, validateRequest(productSaleSchema)],
  sellProduct
);

export const SalesRoutes = router;
