import { Logo } from '../logo';

export function Header({ ...props }) {
  return (
    <header className={props.className} {...props}>
      <Logo
        className={{
          wrapper: 'text-lg font-semibold',
          logo: 'md:size-7',
        }}
      />
    </header>
  );
}
