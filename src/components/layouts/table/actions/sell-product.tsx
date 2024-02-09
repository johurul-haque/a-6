import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSellProductMutation } from '@/redux/api';
import { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { BadgeDollarSign } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function SellProduct({ row }: { row: Row<Product> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sellProduct, { isLoading }] = useSellProductMutation();

  const productId = row.original._id;
  const quantity = row.original.quantity;
  const today = new Date().toISOString().split('T')[0];

  const sellingFormSchema = z.object({
    buyer_name: z.string(),
    sold_on: z.string(),
    quantity_sold: z.coerce.number().max(quantity, `Only ${quantity} left`),
  });

  const form = useForm<z.infer<typeof sellingFormSchema>>({
    resolver: zodResolver(sellingFormSchema),
  });

  return (
    <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <D.DialogTrigger>
        <Button
          variant={'default'}
          className="py-1 h-auto text-sm rounded flex gap-1.5"
        >
          <BadgeDollarSign className="size-4" />
          Sell
        </Button>
      </D.DialogTrigger>
      <D.DialogContent className="sm:max-w-[425px]">
        <D.DialogHeader>
          <D.DialogTitle className="flex gap-2">
            <BadgeDollarSign className="size-5" />
            Sell product
          </D.DialogTitle>
          <D.DialogDescription>
            Provide selling details of the products here. Click save when you
            are done.
          </D.DialogDescription>
        </D.DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              sellProduct({ body: values, productId });
              form.reset();
              setIsOpen(false);
            })}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="buyer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="transition-all"
                      placeholder="Enter buyer name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity_sold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity sold</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="transition-all"
                      placeholder="Enter how many products were sold"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sold_on"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sold on</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="transition-all"
                      placeholder="Enter selling date"
                      max={today}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </D.DialogContent>
    </D.Dialog>
  );
}
