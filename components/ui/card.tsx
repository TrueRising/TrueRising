import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <article className={cn('rounded-card border border-borderSubtle bg-surface p-6 md:p-8 shadow-premium', className)}>{children}</article>
);
