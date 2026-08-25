import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground',
      critical: 'border-red-200 bg-red-50 text-red-700',
      high: 'border-amber-200 bg-amber-50 text-amber-700',
      medium: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      low: 'border-primary/20 bg-primary/10 text-primary',
      neutral: 'border-slate-200 bg-slate-50 text-slate-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
