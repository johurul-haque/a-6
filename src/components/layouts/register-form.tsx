import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { setTokenCookie } from '@/lib/set-cookie';
import { cn } from '@/lib/utils';
import { useRegisterMutation } from '@/redux/api/auth';
import { RegisterPayload, registerFormSchema } from '@/schema/auth-form-schema';
import { SetStateActionType } from '@/types/set-state-action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeClosed } from '../icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const passwordFields = ['password', 'confirm_password'] as const;

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setError: SetStateActionType<string | undefined>;
};

export function RegisterForm({
  className,
  setError,
  ...props
}: RegisterFormProps) {
  const [register, { isLoading, data, error }] = useRegisterMutation();

  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerFormSchema),
  });

  if (data) {
    setTokenCookie(data.token);
    router.reload();
  }

  if (error && 'message' in error) {
    setError(error.message);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(register)} className="grid gap-3">
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
                        type={isShowing ? 'text' : 'password'}
                        placeholder="****"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setIsShowing(!isShowing)}
                      className="absolute translate-y-1/2 bottom-1/2 right-3"
                    >
                      <span className="sr-only">
                        {isShowing ? 'Hide' : 'Show'} password
                      </span>
                      {isShowing ? <Eye /> : <EyeClosed />}
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
