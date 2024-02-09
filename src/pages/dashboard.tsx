import { Header } from '@/components/layouts/header';
import { columns } from '@/components/layouts/table/columns';
import { DataTable } from '@/components/layouts/table/data-table';
import { useProductsQuery } from '@/redux/api';
import { Params } from '@/types/query-params';
import { SetStateActionType } from '@/types/set-state-action';
import { createContext, useState } from 'react';

export type ContextType = {
  setParams: SetStateActionType<Params | undefined>;
  params: Params | undefined;
};

export const ProductsContext = createContext<ContextType | null>(null);

export default function Dashboard() {
  const [params, setParams] = useState<Params | undefined>(undefined);
  const { data: products, isSuccess, refetch } = useProductsQuery(params);

  return (
    <>
      <Header />

      <ProductsContext.Provider value={{ setParams, params }}>
        <main className="container py-10">
          {isSuccess && <DataTable data={products} columns={columns} />}
        </main>
      </ProductsContext.Provider>
    </>
  );
}
