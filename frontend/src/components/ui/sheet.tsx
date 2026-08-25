'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;

export const SheetContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/30" />
    <DialogPrimitive.Content
      className={cn(
        'fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l bg-white p-5 sm:p-6 shadow-lg outline-none',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close asChild>
        <Button variant="ghost" size="icon" className="absolute right-4 top-4">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-5 space-y-1.5', className)} {...props} />
);

export const SheetTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title className={cn('text-base sm:text-lg font-semibold', className)} {...props} />
);

export const SheetDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description className={cn('text-xs sm:text-sm text-muted-foreground', className)} {...props} />
);
