import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import { addProduct, updateProduct } from './product.controller';
import { productSchema } from './product.validation';

const router = Router();

router.post('/add', [verifyToken, validateRequest(productSchema)], addProduct);
router.put(
  '/:productId',
  [verifyToken, validateRequest(productSchema.deepPartial())],
  updateProduct
);
router.delete('/:productId', [verifyToken])

export const ProductRoutes = router;
