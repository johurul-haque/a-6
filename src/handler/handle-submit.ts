import { SERVER_DOMAIN } from '@/config';
import { HandleLoginProps, HandleRegisterProps } from '@/types/handle-submit';

export async function handleRegister({
  values,
  setIsLoading,
  setError,
  router,
}: HandleRegisterProps) {
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
      const result = await res.json();

      setError(result.message);
      setIsLoading(false);
    }
  } catch (err: any) {
    setError(err.message);
    setIsLoading(false);
  }
}

export async function handleLogin({
  values,
  setIsLoading,
  router,
  setError,
}: HandleLoginProps) {
  setIsLoading(true);

  try {
    const res = await fetch(`${SERVER_DOMAIN}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 200) {
      router.reload();
    } else {
      const result = await res.json();

      setError(result.message);
      setIsLoading(false);
    }
  } catch (err: any) {
    setError(err.message);
    setIsLoading(false);
  }
}
