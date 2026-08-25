'use client';

import { AppHeader } from './AppHeader';
import { Sidebar } from './Sidebar';

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="min-h-screen lg:pl-64">
        <AppHeader title={title} subtitle={subtitle} />
        <main className="px-3.5 py-4 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
