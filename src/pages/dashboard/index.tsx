import { Header } from '@/components/layouts/header';
import { columns } from '@/components/layouts/table/columns';
import { DataTable } from '@/components/layouts/table/data-table';
import { useProductsQuery } from '@/redux/api';
import { useState } from 'react';

type ParamsType = Record<string, string> | undefined;

export default function Dashboard() {
  const [params, setParams] = useState<ParamsType>(undefined);
  const { data: products, isSuccess } = useProductsQuery(params);

  return (
    <>
      <Header />

      <main className="container py-10">
        {isSuccess && <DataTable data={products} columns={columns} />}
      </main>
    </>
  );
}
