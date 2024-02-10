import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUpdateProductMutation } from '@/redux/api/products';
import { productSchema } from '@/schema/products-form-schema';
import { Product, ProductSchema } from '@/types/product';
import { SetStateActionType } from '@/types/set-state-action';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ProductFormFields } from '../../product-form-fields';

type EditProductProps = {
  row: Product;
  setIsOpen: SetStateActionType<boolean>;
};

export function EditProduct({ row, setIsOpen }: EditProductProps) {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: row,
  });

  return (
    <>
      <D.DialogContent className="sm:max-w-[550px]">
        <D.DialogHeader className="mt-2">
          <D.DialogTitle className="flex gap-2">
            <Edit className="size-5" />
            Edit product
          </D.DialogTitle>

          <D.DialogDescription>
            Modify details of the product here. Click save when you are done.
          </D.DialogDescription>
        </D.DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              updateProduct({ body: values, id: row._id });
              setIsOpen(false);
            })}
            className="grid gap-3"
          >
            <ProductFormFields form={form} isLoading={isLoading} />

            <Button disabled={isLoading} type="submit" className="w-full mt-3">
              Save
            </Button>
          </form>
        </Form>
      </D.DialogContent>
    </>
  );
}
