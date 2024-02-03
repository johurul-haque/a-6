import { cn } from '@/lib/utils';
import { MacOption } from './icons';

type LogoProps = {
  className?: {
    wrapper?: string;
    logo?: string;
  };
};

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        'relative z-20 flex items-center text-lg font-medium',
        className?.wrapper
      )}
    >
      <MacOption className={cn('mr-2 size-6', className?.logo)} />
      A-5
    </div>
  );
}
