import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-3 h-8 w-8 text-red-600" />
        <h3 className="text-sm sm:text-base font-semibold text-slate-950">We could not load recall data.</h3>
        <p className="mt-1 max-w-md text-xs sm:text-sm text-muted-foreground">
          Check that the backend API is running on port 3001, then try again.
        </p>
        {onRetry ? (
          <Button className="mt-4" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
