import { Badge } from '@/components/ui/badge';
import * as D from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/format-currency';
import { Product } from '@/types/product';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

type ProductDetailsProps = {
  row: Product;
  children: React.ReactNode;
};

export function ViewProductImage({ children, row }: ProductDetailsProps) {
  return (
    <D.Dialog>
      <D.DialogTrigger asChild>{children}</D.DialogTrigger>
      <D.DialogContent className="sm:max-w-[550px] overflow-y-auto max-h-[94svh]">
        <D.DialogHeader>
          <D.DialogTitle className="flex gap-2">
            <ImageIcon className="size-5" />
            {row.name}
            <Badge>{formatCurrency(row.price)}</Badge>
          </D.DialogTitle>
        </D.DialogHeader>

        <Image
          src={row.imageSrc}
          width={500}
          height={333}
          alt={`Image of ${row.name}`}
          className="object-cover object-center aspect-[6/4]"
        />
      </D.DialogContent>
    </D.Dialog>
  );
}
