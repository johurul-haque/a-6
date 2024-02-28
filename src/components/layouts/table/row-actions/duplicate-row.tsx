import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { saveToCloudinary } from '@/lib/save-to-cloudinary';
import { useAddProductMutation } from '@/redux/api/products';
import { productSchema } from '@/schema/products-form-schema';
import { Product, ProductSchema } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { CopyPlusIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductFormFields } from '../../form/product-form-fields';

type DuplicateRowProps = {
  row: Product;
  children: ReactNode;
};

export function DuplicateRow({ row, children }: DuplicateRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [addProduct] = useAddProductMutation();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema.partial({ image: true })),
    defaultValues: row,
  });

  return (
    <>
      <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
        <D.DialogTrigger asChild>{children}</D.DialogTrigger>
        <D.DialogContent className="sm:max-w-[550px] overflow-y-auto max-h-[94svh]">
          <D.DialogHeader className="mt-2">
            <D.DialogTitle className="flex gap-2">
              <CopyPlusIcon className="size-5" />
              Duplicate product
            </D.DialogTitle>
            <D.DialogDescription className="text-left">
              Modify details of the product here. Click save when you are done.
            </D.DialogDescription>
          </D.DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                setIsLoading(true);

                const { image, ...rest } = values;

                let imageSrc = row.imageSrc;

                if (image) {
                  imageSrc = (await saveToCloudinary(image)).secure_url;
                }

                addProduct({ ...values, imageSrc });

                setIsLoading(false);
                setIsOpen(false);
              })}
              className="grid gap-3"
            >
              <ProductFormFields
                form={form}
                isLoading={isLoading}
                defaultImgSrc={row.imageSrc}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-3"
              >
                {isLoading ? 'Uploading...' : 'Save'}
              </Button>
            </form>
          </Form>
        </D.DialogContent>
      </D.Dialog>
    </>
  );
}
