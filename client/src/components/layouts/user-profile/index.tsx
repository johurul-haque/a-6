import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProfileQuery } from '@/redux/api';
import { useLogoutMutation } from '@/redux/api/auth';
import { useTransactionsQuery } from '@/redux/api/sales';
import Cookies from 'js-cookie';
import { ArrowRightLeftIcon, HistoryIcon, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SalesHistory } from './sales-history';
import { ViewTransactionsModal } from './transactions';

export function UserProfile() {
  const { data: user, error: profileError } = useProfileQuery();
  const { data: transactions } = useTransactionsQuery();

  const [logout, { isLoading, data: logoutData }] = useLogoutMutation();

  const router = useRouter();

  useEffect(() => {
    if (logoutData || profileError) {
      Cookies.remove('token');
      router.reload();
    }
  }, [logoutData, profileError, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full focus-visible:ring-0 group"
        >
          <span className="sr-only">My Account</span>
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-8 sm:size-9 group-focus-visible:ring-2 group-focus-visible:ring-slate-300">
            <Image
              alt={`Picture for ${user?.name}`}
              role="presentation"
              fill
              src="/gradient.svg"
            />
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || 'Loading...'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {!!transactions?.length && (
          <>
            <ViewTransactionsModal data={transactions}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Transactions
                <DropdownMenuShortcut>
                  <ArrowRightLeftIcon className="size-4 stroke-current" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </ViewTransactionsModal>

            <DropdownMenuSeparator className="max-sm:hidden" />
          </>
        )}

        <div className="sm:hidden">
          <SalesHistory>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Sales History
              <DropdownMenuShortcut>
                <HistoryIcon className="size-4 stroke-current" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </SalesHistory>

          <DropdownMenuSeparator />
        </div>

        <DropdownMenuItem asChild>
          <button
            className="w-full"
            onClick={() => {
              logout({ email: user?.email });
            }}
            disabled={isLoading}
          >
            Log out
            <DropdownMenuShortcut>
              <LogOut className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </button>
        </DropdownMenuItem>

        {/* <DeleteAccountModal>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="w-full text-rose-600 focus:bg-rose-100 focus:text-rose-600"
          >
            Delete account
            <DropdownMenuShortcut>
              <Trash2 className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DeleteAccountModal> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
