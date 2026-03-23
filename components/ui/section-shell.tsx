import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

export const SectionShell = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section className={cn('py-14 md:py-18 lg:py-24', className)}>{children}</section>
);
