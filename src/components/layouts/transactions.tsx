import * as D from '@/components/ui/dialog';
import { TransactionsData } from '@/types/transactions-data';
import { ArrowRightLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';

type ViewTransactionsModalProps = {
  data?: TransactionsData[];
  children: ReactNode;
};

export function ViewTransactionsModal({
  data,
  children,
}: ViewTransactionsModalProps) {
  return (
    <D.Dialog>
      <D.DialogTrigger asChild>{children}</D.DialogTrigger>
      <D.DialogContent className="md:max-w-[900px] overflow-y-auto max-h-[94svh]">
        <D.DialogHeader className="mb-8 mt-2 flex flex-row justify-between items-center">
          <D.DialogTitle className="flex items-center gap-2">
            <ArrowRightLeftIcon />
            Transactions
          </D.DialogTitle>
        </D.DialogHeader>
      </D.DialogContent>
    </D.Dialog>
  );
}
