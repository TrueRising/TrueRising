import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

type Props = { href?: string; children: React.ReactNode; className?: string; variant?: 'primary' | 'ghost' };

export const Button = ({ href, children, className, variant = 'primary' }: Props) => {
  const classes = cn(
    'inline-flex items-center justify-center rounded-button px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary',
    variant === 'primary'
      ? 'bg-accentPrimary text-white hover:bg-accentHover'
      : 'border border-borderSubtle bg-transparent text-textPrimary hover:bg-surfaceElevated',
    className
  );
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button className={classes} type="submit">{children}</button>;
};
