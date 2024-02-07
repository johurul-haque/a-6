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
import { productSchema } from '@/schema/add-products-form-schema';
import { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgePlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  return (
    <>
      <D.Dialog>
        <D.DialogTrigger asChild>
          <Button size={'sm'} className="flex gap-2 items-center h-8">
            <BadgePlus className="size-4" />
            Add New
          </Button>
        </D.DialogTrigger>
        <D.DialogContent className="sm:max-w-[425px]">
          <D.DialogHeader>
            <D.DialogTitle>Add new product</D.DialogTitle>
            <D.DialogDescription>
              Provide details of the new product here. Click save when you are
              done.
            </D.DialogDescription>
          </D.DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => console.log(values))}
              className="grid gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of the product"
                        type="text"
                        autoCapitalize="none"
                        disabled={isLoading}
                        className="transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-3"
              >
                Continue
              </Button>
            </form>
          </Form>
          <D.DialogFooter>
            <Button type="submit" size={'sm'} className="h-8 px-4">
              Save
            </Button>
          </D.DialogFooter>
        </D.DialogContent>
      </D.Dialog>
    </>
  );
}
