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
import { buttonVariants } from '@/components/ui/button';
import { useDeleteProductMutation } from '@/redux/api/products';
import { SetStateActionType } from '@/types/set-state-action';
import { ReactNode } from 'react';

type DeleteRowProps = {
  children: ReactNode;
  rowId: string;
  setIsDropdownOpen: SetStateActionType<boolean>;
};

export function DeleteRow({
  children,
  rowId,
  setIsDropdownOpen,
}: DeleteRowProps) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this and
            remove it&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={() => {
              deleteProduct(rowId);
              setIsDropdownOpen(false);
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
