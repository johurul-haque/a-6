import * as D from '@/components/ui/dialog';
import { useDeleteAccountMutation } from '@/redux/api/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FormEvent, ReactNode, useState } from 'react';
import { Eye, EyeClosed } from '../../icons';
import { AlertDestructive } from '../../ui/alert';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export function DeleteAccountModal({ children }: { children: ReactNode }) {
  const [deleteAccount, { isLoading, data, error }] =
    useDeleteAccountMutation();

  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteAccount({ password: inputValue });
  };

  if (data) {
    Cookies.remove('token');
    router.reload();
  }

  return (
    <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <D.DialogTrigger asChild>{children}</D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader>
          <D.DialogTitle>Are you absolutely sure?</D.DialogTitle>
          <D.DialogDescription>
            This action can&apos;t be undone. It will permanently erase your
            account and all of the data associated with it.
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
              type={isPasswordShowing ? 'text' : 'password'}
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />

            <button
              type="button"
              onClick={() => setIsPasswordShowing(!isPasswordShowing)}
              disabled={isLoading}
              className="absolute translate-y-1/2 bottom-1/2 right-3"
            >
              <span className="sr-only">
                {isPasswordShowing ? 'Hide' : 'Show'} password
              </span>

              {isPasswordShowing ? (
                <EyeClosed />
              ) : (
                <Eye
                  aria-hidden={true}
                  className="stroke-gray-500 hover:stroke-gray-600"
                />
              )}
            </button>
          </div>

          {error && 'data' in error && (
            <AlertDestructive message={(error as any).data.message} />
          )}
          <D.DialogFooter className="mt-3">
            <Button
              variant={'secondary'}
              type="button"
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
      </D.DialogContent>
    </D.Dialog>
  );
}
