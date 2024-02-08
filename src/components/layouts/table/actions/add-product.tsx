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
              <div className="sm:grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter eye-glass name"
                          type="text"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter brand name"
                          type="text"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price in dollars"
                          type="number"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Available quantity"
                          type="number"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frame.material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frame Material</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="font-normal">
                            <SelectValue placeholder="Select frame material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MATERIALS.map((material) => (
                            <SelectItem
                              key={material}
                              value={material}
                              className="capitalize"
                            >
                              {material}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frame.shape"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frame Shape</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="font-normal">
                            <SelectValue placeholder="Select frame shape" />
                          </SelectTrigger>

                          <SelectContent>
                            {SHAPES.map((shape) => (
                              <SelectItem
                                key={shape}
                                value={shape}
                                className="capitalize"
                              >
                                {shape}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hinge_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hinge Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="font-normal">
                            <SelectValue placeholder="Select hinge type" />
                          </SelectTrigger>

                          <SelectContent>
                            {HINGES.map((hinge) => (
                              <SelectItem
                                key={hinge}
                                value={hinge}
                                className="capitalize"
                              >
                                {hinge}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lens_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lens Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Lens Type"
                          type="text"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="font-normal">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {GENDERS.map((gender) => (
                            <SelectItem
                              key={gender}
                              value={gender}
                              className="capitalize"
                            >
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter eye-glass color"
                          type="text"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temple_length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temple Length</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter length in mm"
                          type="number"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bridge_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bridge Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter bridge size in mm"
                          type="number"
                          disabled={isLoading}
                          className="transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
