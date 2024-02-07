import { Header } from '@/components/layouts/header';
import { columns } from '@/components/layouts/table/columns';
import { DataTable } from '@/components/layouts/table/data-table';
import { useProductsQuery } from '@/redux/api';

export default function Dashboard() {
  const { data: products, isSuccess } = useProductsQuery();

  return (
    <>
      <Header />

      <main className="container py-10">
        {isSuccess && <DataTable data={products} columns={columns} />}
      </main>
    </>
  );
}
