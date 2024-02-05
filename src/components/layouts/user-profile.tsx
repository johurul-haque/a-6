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
import { User } from '@/types/user';
import { LogOut, Trash2 } from 'lucide-react';
import Image from 'next/image';

type UserProfileProps = {
  user: User;
};

export function UserProfile({ user }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full focus-visible:ring-0 group"
        >
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-9 group-focus-visible:ring-2 group-focus-visible:ring-slate-300">
            <Image
              alt={`Picture for ${user.name}`}
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
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="w-full">
            Log out
            <DropdownMenuShortcut>
              <LogOut className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full text-rose-600 focus:bg-rose-100 focus:text-rose-600">
          Delete account
          <DropdownMenuShortcut>
            <Trash2 className="size-4 stroke-current" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
