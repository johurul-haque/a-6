import * as D from '@/components/ui/dialog';
import { useDeleteAccountMutation } from '@/redux/api/auth';
import { SetStateActionType } from '@/types/set-state-action';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Eye } from '../icons';
import { AlertDestructive } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function DeleteAccount({
  setIsOpen,
}: {
  setIsOpen: SetStateActionType<boolean>;
}) {
  const [deleteAccount, { isLoading, data, error }] =
    useDeleteAccountMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteAccount({ password: inputValue });
  };

  if (data) {
    router.reload();
    setIsOpen(false);
  }

  return (
    <>
      <D.DialogHeader>
        <D.DialogTitle>Are you absolutely sure?</D.DialogTitle>
        <D.DialogDescription>
          This action cannot be undone. It will permanently delete your account
          and all of the data associated with it.
        </D.DialogDescription>
      </D.DialogHeader>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="password">Password</Label>
        <div className="relative mb-3 mt-1">
          <Input
            className="transition-all"
            id="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
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

        {error && <AlertDestructive message={'Password does not match.'} />}
        <D.DialogFooter className="mt-3">
          <Button
            variant={'secondary'}
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant={'destructive'} disabled={isLoading}>
            Confirm
          </Button>
        </D.DialogFooter>
      </form>
    </>
  );
}
