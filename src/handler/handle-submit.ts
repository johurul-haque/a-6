import { SERVER_DOMAIN } from '@/config';
import { RegisterHandlerProps } from '@/types/submit-handler';

export async function handleRegister({
  values,
  setIsLoading,
  setError,
  router,
}: RegisterHandlerProps) {
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
