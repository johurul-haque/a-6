import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './data-table-view-options';

import { AddProduct } from './actions/add-product';
import { FilterTable } from './data-table-filter';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex justify-between items-center gap-3">
      <DataTableViewOptions table={table} />

      <div className="flex items-center space-x-2 mr-auto">
        <FilterTable table={table} />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <AddProduct />
    </div>
  );
}
