import { Badge } from '@/components/ui/badge';
import type { RecallSeverity } from '@/types/recall';

export function SeverityBadge({ severity }: { severity: RecallSeverity }) {
  return (
    <Badge variant={severity}>
      {severity.charAt(0).toUpperCase()}
      {severity.slice(1)}
    </Badge>
  );
}
