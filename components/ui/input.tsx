import { cn } from '@/lib/utils/cn';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      'w-full rounded-input border border-borderSubtle bg-backgroundSecondary px-4 py-3 text-sm text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary',
      props.className
    )}
  />
);
