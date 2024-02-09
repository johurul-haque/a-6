import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useSellProductMutation } from '@/redux/api/products';
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

  const sellingFormSchema = z.object({
    buyer_name: z.string(),
    sold_on: z.date(),
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
            Provide selling details of the product. Click save when you are
            done.
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal flex items-center w-full',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
