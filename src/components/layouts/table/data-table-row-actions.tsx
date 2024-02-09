import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useClickAway } from '@uidotdev/usehooks';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditProduct } from './actions/edit-product';
import { useDeleteProductMutation } from '@/redux/api/products';

interface DataTableRowActionsProps {
  row: Row<Product>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    if (!isFormVisible) {
      setIsOpen(false);
    }
  });

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  return (
    <DropdownMenu open={isOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          onClick={() => setIsOpen(true)}
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent ref={ref} align="start" className="w-[160px]">
        <DropdownMenuItem>
          <EditProduct
            row={row.original}
            setIsFormVisible={setIsFormVisible}
            openDropdown={setIsOpen}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full text-rose-600 hover:bg-rose-100 hover:text-rose-600 focus:bg-rose-100 focus:text-rose-600"
          onClick={() => {
            deleteProduct(row.original._id);
            setIsOpen(false);
          }}
          disabled={isLoading}
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 className="size-4 stroke-current" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
