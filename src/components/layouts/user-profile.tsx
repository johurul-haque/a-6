import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogoutMutation, useProfileQuery } from '@/redux/api';
import { LogOut, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DeleteAccount } from './delete-account';
import { useState } from 'react';

export function UserProfile() {
  const { data: user } = useProfileQuery(undefined);
  const [logout, { isLoading, data }] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter();

  if (data) router.reload();

  return (
    <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-8 rounded-full focus-visible:ring-0 group"
          >
            <span className="relative flex shrink-0 overflow-hidden rounded-full size-9 group-focus-visible:ring-2 group-focus-visible:ring-slate-300">
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

          <D.DialogTrigger asChild>
            <DropdownMenuItem className="w-full text-rose-600 focus:bg-rose-100 focus:text-rose-600">
              Delete account
              <DropdownMenuShortcut>
                <Trash2 className="size-4 stroke-current" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </D.DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <D.DialogContent>
        <DeleteAccount setIsOpen={setIsOpen} />
      </D.DialogContent>
    </D.Dialog>
  );
}
