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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  GENDERS,
  HINGES,
  MATERIALS,
  SHAPES,
} from '@/constants/product-constants';
import { useAddProductMutation } from '@/redux/api';
import { productSchema } from '@/schema/add-products-form-schema';
import { ProductSchema } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgePlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductFormFields } from '../../product-form-field';

export function AddProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  return (
    <>
      <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
        <D.DialogTrigger asChild>
          <Button size={'sm'} className="flex gap-2 items-center h-8">
            <BadgePlus className="size-4" />
            Add New
          </Button>
        </D.DialogTrigger>
        <D.DialogContent className="sm:max-w-[550px] overflow-y-auto max-h-[94svh]">
          <D.DialogHeader className="mt-2">
            <D.DialogTitle>Add new product</D.DialogTitle>
            <D.DialogDescription>
              Provide details of the new product here. Click save when you are
              done.
            </D.DialogDescription>
          </D.DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                addProduct(values);
                setIsOpen(false);
                form.reset();
              })}
              className="grid gap-3"
            >
              <ProductFormFields form={form} isLoading={isLoading} />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-3"
              >
                Save
              </Button>
            </form>
          </Form>
        </D.DialogContent>
      </D.Dialog>
    </>
  );
}
