import * as D from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { DemoCredentials } from '@/types/demo-credentials';
import { SetStateActionType } from '@/types/set-state-action';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { inter } from '../fonts';
import { Button } from '../ui/button';

const ACCOUNTS = [
  {
    role: 'user',
    canDo:
      'Can perform actions on the products they created. Create sales record, generate invoices, track sales history etc.',
  },
  {
    role: 'manager',
    canDo:
      'Can view products listed by other users, check invoices, track sales history and perform any other actions a user can do.',
  },
];

type PropsType = {
  setDemoCredentials: SetStateActionType<DemoCredentials | undefined>;
};

export function DemoAccounts({ setDemoCredentials }: PropsType) {
  const [selectedRole, setSelectedRole] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
        <D.DialogTrigger className="text-sm mt-2 max-w-fit mx-auto">
          Or use a{' '}
          <span className="underline underline-offset-2">demo account</span>
        </D.DialogTrigger>

        <D.DialogContent
          className={`sm:max-w-[550px] overflow-y-auto max-h-[94svh] ${inter.className}`}
        >
          <D.DialogHeader className="mt-2">
            <D.DialogTitle className="flex gap-2">Demo Accounts</D.DialogTitle>
            <D.DialogDescription className="text-left">
              Select one of the accounts from below to interact with the
              application.
            </D.DialogDescription>
          </D.DialogHeader>

          <ul className="space-y-3">
            {ACCOUNTS.map(({ role, canDo }) => (
              <li
                key={role}
                className={cn(
                  'border rounded-md px-4 py-2.5 hover:bg-gray-200 cursor-pointer',
                  {
                    'bg-gray-200': role === selectedRole,
                  }
                )}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex justify-between">
                  <h3 className="max-sm:text-sm font-semibold capitalize">
                    {role}
                  </h3>
                  {role === selectedRole && (
                    <CheckIcon className="size-4 text-emerald-600" />
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-0.5">
                  {canDo}
                </p>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => {
              setDemoCredentials(getCredentials(selectedRole));
              setIsOpen(false);
            }}
            className="font-normal"
            disabled={!selectedRole}
          >
            Continue
          </Button>
        </D.DialogContent>
      </D.Dialog>
    </>
  );
}

function getCredentials(role?: string) {
  switch (role) {
    case 'manager':
      return {
        email: 'johurul@manager.com',
        password: '@johurul',
      };
    default:
      return {
        email: 'johurul@nnobd.org',
        password: '@johurul',
      };
  }
}
