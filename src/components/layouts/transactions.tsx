import * as D from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/format-currency';
import { formatDate } from '@/lib/format-date';
import { TransactionsData } from '@/types/transactions-data';
import { DownloadIcon } from '@radix-ui/react-icons';
import { ArrowRightLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

type ViewTransactionsModalProps = {
  data: TransactionsData[];
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
        <D.DialogHeader>
          <D.DialogTitle className="flex items-center gap-2">
            <ArrowRightLeftIcon className="max-[400px]:size-4 size-5" />
            <span className="max-[400px]:text-base">Transactions</span>
          </D.DialogTitle>
          <D.DialogDescription className="text-start">
            A list of transactions you made from selling products
          </D.DialogDescription>
        </D.DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right whitespace-nowrap">
                Total Sale
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className="block mx-auto border-dashed"
                  >
                    <span className="sr-only">Download Invoice</span>
                    <DownloadIcon />
                  </Button>
                </TableCell>

                <TableCell className="max-w-[150px] truncate">
                  {formatDate(row.sold_on)}
                </TableCell>
                <TableCell className="max-w-[180px] truncate">
                  {row.buyer_name}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.productId?.name}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(row.total_sale)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </D.DialogContent>
    </D.Dialog>
  );
}
