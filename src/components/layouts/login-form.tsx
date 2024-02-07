import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { handleLogin } from '@/handler/handle-submit';
import { cn } from '@/lib/utils';
import { loginFormSchema } from '@/schema/auth-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye } from '../icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type LoginFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setError: React.Dispatch<SetStateAction<string>>;
};

export function LoginForm({ className, setError, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<loginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            handleLogin({ values, setIsLoading, setError, router })
          )}
          className="grid gap-3"
        >
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="transition-all"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="****"
                      disabled={isLoading}
                      {...field}
                    />
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
