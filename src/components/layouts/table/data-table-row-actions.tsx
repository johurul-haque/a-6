import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { CopyPlusIcon, Edit, ImageIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeleteRow } from './row-actions/delete-row';
import { DuplicateRow } from './row-actions/duplicate-row';
import { EditProduct } from './row-actions/edit-product';
import { ViewProductImage } from './row-actions/product-image';

interface DataTableRowActionsProps {
  row: Row<Product>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
        <ViewProductImage row={row.original}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            View Image
            <DropdownMenuShortcut>
              <ImageIcon className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </ViewProductImage>

        <DropdownMenuSeparator />

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

        <DropdownMenuSeparator />

        <DeleteRow setIsDropdownOpen={setIsOpen} rowId={row.original._id}>
          <DropdownMenuItem
            className="w-full text-rose-600 hover:bg-rose-100 hover:text-rose-600 focus:bg-rose-100 focus:text-rose-600"
            onSelect={(e) => e.preventDefault()}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DeleteRow>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
