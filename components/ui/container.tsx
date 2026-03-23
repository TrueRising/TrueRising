import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

export const Container = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('mx-auto w-full max-w-container px-5 md:px-8', className)}>{children}</div>
);
