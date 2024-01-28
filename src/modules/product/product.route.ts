import { verifyToken } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validate-request';
import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from './product.controller';
import { productSchema } from './product.validation';

const router = Router();

router.get('/', verifyToken, getProducts);
router.post('/add', [verifyToken, validateRequest(productSchema)], addProduct);
router.patch(
  '/:productId',
  [verifyToken, validateRequest(productSchema.deepPartial())],
  updateProduct
);
router.delete('/:productId', [verifyToken], deleteProduct);

export const ProductRoutes = router;
