import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MetricCard({
  title,
  value,
  icon: Icon,
  note,
  accent = 'bg-primary',
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  note: string;
  accent?: string;
}) {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary/40 hover:shadow-sm select-none">
      <div className={cn('absolute inset-y-0 left-0 w-1 rounded-l-xl', accent)} />
      <CardContent className="p-4 pl-5 sm:p-5 sm:pl-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-[13px] font-medium text-muted-foreground">{title}</p>
            <div className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{value}</div>
          </div>
          <div className={cn('grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg', accent, 'bg-opacity-10')}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
        </div>
        <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-normal text-muted-foreground/80">{note}</p>
      </CardContent>
    </Card>
  );
}

