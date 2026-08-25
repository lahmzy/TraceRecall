import { SearchX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <SearchX className="mb-3 h-8 w-8 text-muted-foreground" />
        <h3 className="text-sm sm:text-base font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 max-w-md text-xs sm:text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
