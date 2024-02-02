import { SERVER_DOMAIN } from '@/config';
import { loginFormSchema, registerFormSchema } from '@/schema/form-schema';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

type HandleRegister = {
  values: registerFormSchema;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsErr: Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
};

export async function handleRegister({
  values,
  setIsLoading,
  setIsErr,
  router,
}: HandleRegister) {
  setIsLoading(true);

  const { confirm_password, ...rest } = values;

  try {
    const res = await fetch(`${SERVER_DOMAIN}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    });

    if (res.status === 201) {
      router.reload();
    } else {
      setIsErr(true);
    }
  } catch (err) {
    setIsErr(true);
  }
}

export async function handleLogin(
  values: loginFormSchema,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);
}
