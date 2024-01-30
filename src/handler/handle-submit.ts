import { SERVER_DOMAIN } from '@/config';
import { loginFormSchema, registerFormSchema } from '@/schema/form-schema';
import { Dispatch, SetStateAction } from 'react';

export async function handleRegister(
  values: registerFormSchema,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);

  const { confirm_password, ...rest } = values;

  try {
    await fetch(`${SERVER_DOMAIN}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function handleLogin(
  values: loginFormSchema,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);
}
