import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { priorities } from './data/data';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const columns = {
    title: table.getColumn('title'),
    status: table.getColumn('status'),
    priority: table.getColumn('priority'),
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.status && (
          <DataTableFacetedFilter
            column={columns.status}
            title="Status"
            options={priorities}
          />
        )}
        {columns.priority && (
          <DataTableFacetedFilter
            column={columns.priority}
            title="Priority"
            options={priorities}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
