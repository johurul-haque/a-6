import { Header } from '@/components/layouts/header';
import { columns } from '@/components/layouts/table/columns';
import { DataTable } from '@/components/layouts/table/data-table';
import tasks from '@/components/layouts/table/data/tasks.json';
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
      <Header className="container pt-6" />

      <main className="container py-10">
        <DataTable data={tasks} columns={columns} />
      </main>
    </>
  );
}
