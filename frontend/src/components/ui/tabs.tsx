'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List className={cn('inline-flex h-10 items-center rounded-md bg-muted p-1', className)} {...props} />
);

export const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn('mt-4', className)} {...props} />
);
