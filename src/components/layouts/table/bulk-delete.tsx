import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { useBulkDeleteMutation } from '@/redux/api/products';
import { Row, Table } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';

type BulkDeleteProps<TData> = {
  table: Table<TData>;
};

function getSelectedRowsId(rows: Row<any>[]): string[] {
  return rows.map((row) => row.original._id);
}

export function BulkDelete<TData>({ table }: BulkDeleteProps<TData>) {
  const [bulkDelete, { isLoading }] = useBulkDeleteMutation();

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedRowsId = getSelectedRowsId(selectedRows);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="h-8 px-2 lg:px-3"
          disabled={isLoading}
        >
          <Trash2Icon className="mr-2 size-4" />
          Delete selected
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove it&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={() => {
              bulkDelete(selectedRowsId);
              table.toggleAllRowsSelected(false);
            }}
            disabled={isLoading}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
