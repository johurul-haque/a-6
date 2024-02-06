import { Logo } from '../logo';
import { UserProfile } from './user-profile';

export function Header() {
  return (
    <header className="container pt-6 flex items-center justify-between">
      <Logo
        className={{
          wrapper: 'text-lg font-semibold',
          logo: 'md:size-7',
        }}
      />
      <UserProfile />
    </header>
  );
}
