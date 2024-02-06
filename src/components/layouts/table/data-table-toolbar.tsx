import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { priorities, statuses } from './data/data';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = {
    title: table.getColumn('title'),
    status: table.getColumn('status'),
    priority: table.getColumn('priority'),
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search products..."
          onChange={(event) =>
            columns.title?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Select onValueChange={(value) => console.log(value)}>
          <SelectTrigger className="w-28 h-8 border-dashed font-medium">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        {columns.status && (
          <DataTableFacetedFilter
            column={columns.status}
            title="Status"
            options={statuses}
          />
        )}
        
        {columns.priority && (
          <DataTableFacetedFilter
            column={columns.priority}
            title="Priority"
            options={priorities}
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
