import { SetStateAction, useState } from 'react';

import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { handleRegister } from '@/handler/handle-submit';
import { registerFormSchema } from '@/schema/form-schema';
import { useRouter } from 'next/router';
import { Eye } from '../icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const passwordFields = ['password', 'confirm_password'] as const;

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setIsErr: React.Dispatch<SetStateAction<boolean>>;
};

export function RegisterForm({
  className,
  setIsErr,
  ...props
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<registerFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            handleRegister({ values, setIsLoading, router, setIsErr })
          )}
          className="grid gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="transition-all"
                    placeholder="Your name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {passwordFields.map((name, i) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i > 0 && 'Confirm'} Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="transition-all"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="****"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute translate-y-1/2 bottom-1/2 right-3"
                    >
                      <span className="sr-only">
                        {showPassword ? 'Hide' : 'Show'} password
                      </span>
                      <Eye
                        aria-hidden={true}
                        className="stroke-gray-700 hover:stroke-gray-800"
                      />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
