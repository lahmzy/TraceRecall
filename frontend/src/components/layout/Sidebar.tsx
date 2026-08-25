'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlertTriangle, BarChart3, Box, Factory, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/recalls', label: 'Recalls', icon: AlertTriangle },
  { href: '/products', label: 'Products', icon: Box, disabled: true },
  { href: '/suppliers', label: 'Suppliers', icon: Factory, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b px-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold tracking-tight text-foreground">RecallTrace</div>
            <div className="text-[11px] font-normal text-muted-foreground">Recall Impact Explorer</div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 py-2.5 lg:p-3 lg:flex-col lg:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'flex min-w-max items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors',
                  active && 'bg-primary/10 text-primary',
                  item.disabled && 'cursor-not-allowed opacity-45',
                  !active && !item.disabled && 'hover:bg-muted hover:text-slate-950',
                )}
                aria-disabled={item.disabled}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden border-t p-4 lg:block">
          <div className="rounded-lg border bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Graph database connected
            </div>
            <p className="mt-1 text-xs text-muted-foreground">CognoDB via Bolt</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
