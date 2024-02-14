import { Button } from '@/components/ui/button';
import { ProductsContext } from '@/pages/dashboard';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useContext } from 'react';
import { SalesHistory } from '../sales-history';
import { FilterTable } from './data-table-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { AddProduct } from './row-actions/add-product';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const context = useContext(ProductsContext);

  if (!context) return;

  return (
    <div className="flex justify-between items-center gap-3">
      <DataTableViewOptions table={table} />

      <div className="flex items-center space-x-2 mr-auto">
        <FilterTable table={table} />

        {(isFiltered || context.params) && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              context.removeUrlParams();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <SalesHistory />
      <AddProduct />
    </div>
  );
}
