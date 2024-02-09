import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Refetch } from '@/types/refetch';
import { Column } from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableRangeFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  refetch: Refetch;
}

const defaultValues = {
  min: '',
  max: '',
};

export function DataTableRangeFilter<TData, TValue>({
  column,
  title,
  refetch
}: DataTableRangeFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const [inputValues, setInputValues] = useState(defaultValues);

  return (
    <Popover>
      <PopoverTrigger className="capitalize w-full text-start">
        {title}
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start" sideOffset={8}>
        <h4 className="capitalize text-sm font-medium pt-1.5 px-2.5">
          {title}
        </h4>
        <div className="p-2.5 grid grid-cols-2 gap-2">
          <input
            className="transition-all outline-none border rounded-md px-2 h-8 min-w-0 focus-visible:ring-1 focus-visible:ring-slate-300 text-sm"
            value={inputValues.min}
            onChange={(e) =>
              setInputValues((prev) => ({ ...prev, min: e.target.value }))
            }
            type="number"
            placeholder={`Min ${title}`}
          />
          <input
            className="transition-all outline-none border rounded-md px-2 h-8 min-w-0 focus-visible:ring-1 focus-visible:ring-slate-300 text-sm"
            value={inputValues.max}
            onChange={(e) =>
              setInputValues((prev) => ({ ...prev, max: e.target.value }))
            }
            type="number"
            placeholder={`Max ${title}`}
          />
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-2 p-1.5">
          <Button
            variant={'ghost'}
            onClick={() => setInputValues(defaultValues)}
            className="justify-center text-center h-8 font-normal"
          >
            Clear filters
          </Button>
          <Button
            variant={'ghost'}
            onClick={() => refetch()}
            className="justify-center text-center h-8 border border-dashed font-medium"
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
