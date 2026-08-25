import { Badge } from '@/components/ui/badge';
import type { RecallStatus } from '@/types/recall';

const variants = {
  active: 'critical',
  monitoring: 'medium',
  closed: 'low',
} as const;

export function StatusBadge({ status }: { status: RecallStatus }) {
  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase()}
      {status.slice(1)}
    </Badge>
  );
}
