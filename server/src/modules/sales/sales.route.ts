import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import {
  getSalesHistory,
  getTransactions,
  sellProduct,
} from './sales.controller';
import { productSaleSchema } from './sales.validation';

const router = Router();

router.post(
  '/sales',
  [verifyToken(), validateRequest(productSaleSchema)],
  sellProduct
);
router.get('/sales-history', [verifyToken()], getSalesHistory);
router.get('/transactions', [verifyToken()], getTransactions);

export const SalesRoutes = router;
