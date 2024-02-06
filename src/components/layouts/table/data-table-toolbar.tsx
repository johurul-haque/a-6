import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './data-table-view-options';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { frameMaterials } from './data/data';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [columnId, setColumnId] = useState('name');

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Search products by ${columnId}...`}
          onChange={(event) =>
            table.getColumn(columnId)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[280px]"
        />

        <Select onValueChange={(value) => setColumnId(value)}>
          <SelectTrigger className="w-32 h-8 border-dashed font-medium">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            {table
              .getVisibleFlatColumns()
              .filter((column) => typeof column.accessorFn !== 'undefined')
              .map((column) => (
                <SelectItem
                  key={column.id}
                  value={column.id}
                  className="capitalize"
                >
                  {column.id.split('_').join(' ')}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {table.getColumn('frame_material') && (
          <DataTableFacetedFilter
            column={table.getColumn('frame_material')}
            title="Frame material"
            options={frameMaterials}
          />
        )}

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
      <DataTableViewOptions table={table} />
    </div>
  );
}
