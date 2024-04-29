import Link from 'next/link';

import { RegisterForm } from '@/components/layouts/form/register-form';
import { Logo } from '@/components/logo';
import { NextHead } from '@/components/next-head';
import { AlertDestructive } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Register() {
  const [error, setError] = useState<string | undefined>('');

  return (
    <>
      <NextHead title="Register" />

      <main className="container relative h-[100svh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Login
        </Link>

        <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <Logo
            className={{
              wrapper: 'absolute inset-10 flex justify-center text-4xl',
              logo: 'size-9 mr-3',
            }}
          />
        </div>

        <div className="lg:p-8 relative">
          <div className="bg-white/90 absolute inset-0 z-30 flex flex-col justify-center text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-1">
              Archived Project
            </h2>
            <p className="max-w-[15rem] mx-auto leading-5">
              Use a demo account from the login page.
            </p>
          </div>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to create your account
              </p>
            </div>

            {error && <AlertDestructive message={error} />}
            <RegisterForm setError={setError} />
          </div>
        </div>
      </main>
    </>
  );
}
