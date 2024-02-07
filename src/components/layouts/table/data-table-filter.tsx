import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableToolbarProps } from './data-table-toolbar';

export function FilterTable<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed flex items-center gap-1.5"
        >
          <Filter className="size-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="center" sideOffset={6}>
        <Command>
          <CommandInput placeholder={'Filter by'} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )
                .map((column) => {
                  const row = table.getColumn(column.id);
                  const facets = column?.getFacetedUniqueValues();

                  return (
                    <CommandItem key={column.id} className="capitalize">
                      {row && (
                        <DataTableFacetedFilter
                          column={row}
                          title={column.id.split('_').join(' ')}
                          options={Array.from(facets.keys())}
                        />
                      )}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
