import { User } from '@/types/user';
import { Logo } from '../logo';
import { UserProfile } from './user-profile';

type HeaderProps = {
  user: User;
};

export function Header({ user }: HeaderProps) {
  return (
    <header className="container pt-6 flex items-center justify-between">
      <Logo
        className={{
          wrapper: 'text-lg font-semibold',
          logo: 'md:size-7',
        }}
      />
      <UserProfile user={user} />
    </header>
  );
}
