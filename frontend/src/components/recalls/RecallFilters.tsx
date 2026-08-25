import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { RecallSeverity, RecallStatus } from '@/types/recall';

export function RecallFilters({
  search,
  status,
  severity,
  onSearchChange,
  onStatusChange,
  onSeverityChange,
}: {
  search: string;
  status: RecallStatus | 'all';
  severity: RecallSeverity | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: RecallStatus | 'all') => void;
  onSeverityChange: (value: RecallSeverity | 'all') => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-white p-3.5 sm:p-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search recalls" />
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
        <Select value={status} onChange={(event) => onStatusChange(event.target.value as RecallStatus | 'all')}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="monitoring">Monitoring</option>
          <option value="closed">Closed</option>
        </Select>
        <Select value={severity} onChange={(event) => onSeverityChange(event.target.value as RecallSeverity | 'all')}>
          <option value="all">All severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>
    </div>
  );
}
