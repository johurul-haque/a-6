import { loginFormSchema, registerFormSchema } from '@/schema/form-schema';
import { NextRouter } from 'next/router';
import { SetStateAction } from 'react';

export type HandleRegisterProps = {
  values: registerFormSchema;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<string>>;
  router: NextRouter;
};

export type HandleLoginProps = {
  values: loginFormSchema;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
  setError: React.Dispatch<SetStateAction<string>>;
};
