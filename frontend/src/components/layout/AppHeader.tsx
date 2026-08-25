import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-base sm:text-lg font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle ? <p className="truncate text-xs sm:text-[13px] font-normal text-muted-foreground">{subtitle}</p> : null}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            RT
          </div>
        </div>
      </div>
    </header>
  );
}

