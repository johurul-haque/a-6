import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteProductMutation } from '@/redux/api/products';
import { Product } from '@/types/product';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { CopyPlusIcon, Edit, Trash2 } from 'lucide-react';
import { DuplicateRow } from './row-actions/duplicate-row';
import { EditProduct } from './row-actions/edit-product';

interface DataTableRowActionsProps {
  row: Row<Product>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <EditProduct row={row.original}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit
            <DropdownMenuShortcut>
              <Edit className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </EditProduct>

        <DuplicateRow row={row.original}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Duplicate
            <DropdownMenuShortcut>
              <CopyPlusIcon className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DuplicateRow>

        <DropdownMenuItem
          className="w-full text-rose-600 hover:bg-rose-100 hover:text-rose-600 focus:bg-rose-100 focus:text-rose-600"
          onClick={() => {
            deleteProduct(row.original._id);
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
