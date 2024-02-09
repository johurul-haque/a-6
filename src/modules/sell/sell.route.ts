import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { sellProduct } from './sell.controller';
import { productSellSchema } from './sell.validation';

const router = Router();

router.post(
  '/sell/:productId',
  [verifyToken, validateRequest(productSellSchema)],
  sellProduct
);

export const SellRoutes = router;
