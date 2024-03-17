import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Column } from '@tanstack/react-table';
import { Search } from 'lucide-react';

type SearchTableProps<TData, TValue> = {
  title: string;
  column: Column<TData, TValue>;
};

export function SearchTable<TData, TValue>({
  title,
  column,
}: SearchTableProps<TData, TValue>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed flex items-center gap-1.5"
        >
          <Search className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-fit py-2 flex gap-2 items-center px-2"
        align="center"
        sideOffset={6}
      >
        <Search className="size-4 stroke-slate-400" />
        <input
          className="outline-none min-w-0 w-full text-sm"
          onChange={(e) => column.setFilterValue(e.target.value)}
          type="search"
          placeholder={title}
        />
      </PopoverContent>
    </Popover>
  );
}
