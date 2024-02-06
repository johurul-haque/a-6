import { Header } from '@/components/layouts/header';
import { columns } from '@/components/layouts/table/columns';
import { DataTable } from '@/components/layouts/table/data-table';
import tasks from '@/components/layouts/table/data/tasks.json';
import { useProductsQuery } from '@/redux/api';

export default function Dashboard() {
  const { data: products } = useProductsQuery(undefined);

  return (
    <>
      <Header />

      <main className="container py-10">
        {products?.data.length && <DataTable data={tasks} columns={columns} />}
      </main>
    </>
  );
}
