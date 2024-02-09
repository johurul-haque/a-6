import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { Form } from '@/components/ui/form';
import { useUpdateProductMutation } from '@/redux/api';
import { productSchema } from '@/schema/products-form-schema';
import { Product, ProductSchema } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductFormFields } from '../../product-form-fields';

type EditProductProps = {
  setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
  openDropdown: React.Dispatch<SetStateAction<boolean>>;
  row: Product;
};

export function EditProduct({
  row,
  setIsFormVisible,
  openDropdown: closeDropdown,
}: EditProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: row,
  });

  return (
    <>
      <D.Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          setIsFormVisible(open);
        }}
      >
        <D.DialogTrigger className="flex items-center justify-between w-full">
          Edit
          <DropdownMenuShortcut>
            <Edit className="size-4 stroke-current" />
          </DropdownMenuShortcut>
        </D.DialogTrigger>
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
                setIsFormVisible(false);
                closeDropdown(false);
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
