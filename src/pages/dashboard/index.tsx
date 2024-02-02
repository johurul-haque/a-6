import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchProducts,
  selectAllProducts,
} from '@/redux/features/products/products-slice';
import { useEffect } from 'react';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);

  const productsStateStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productsStateStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productsStateStatus, dispatch]);

  return (
    <>
      {products.map((product) => (
        <h2 key={product._id}>{product.name}</h2>
      ))}
    </>
  );
}
