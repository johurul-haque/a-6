import { Button } from '@/components/ui/button';
import { ProductsContext } from '@/pages/dashboard';
import { useBulkDeleteMutation } from '@/redux/api/products';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Row, Table } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
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
  const isSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedRowsId = getSelectedRowsId(selectedRows);

  const [bulkDelete, { isLoading }] = useBulkDeleteMutation();

  const context = useContext(ProductsContext);

  if (!context) return;

  return (
    <div className="flex justify-between items-center gap-3">
      <DataTableViewOptions table={table} />

      <div className="flex items-center gap-x-2 mr-auto">
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
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      {isSelected && (
        <Button
          variant="destructive"
          className="h-8 px-2 lg:px-3"
          onClick={() => {
            bulkDelete(selectedRowsId);
            table.toggleAllRowsSelected(false);
          }}
          disabled={isLoading}
        >
          <Trash2Icon className="mr-2 size-4" />
          Delete selected
        </Button>
      )}
      <SalesHistory />
      <AddProduct />
    </div>
  );
}

function getSelectedRowsId(rows: Row<any>[]): string[] {
  return rows.map((row) => row.original._id);
}
