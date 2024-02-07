import { loginFormSchema, registerFormSchema } from '@/schema/auth-form-schema';
import { NextRouter } from 'next/router';
import { SetStateAction } from 'react';

type HandlerProps = {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
  setError: React.Dispatch<SetStateAction<string>>;
};

export type RegisterHandlerProps = HandlerProps & {
  values: registerFormSchema;
};

export type LoginHandlerProps = HandlerProps & {
  values: loginFormSchema;
};
