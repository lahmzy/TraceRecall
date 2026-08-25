export type RecallSeverity = 'critical' | 'high' | 'medium' | 'low';
export type RecallStatus = 'active' | 'monitoring' | 'closed';

export type Recall = {
  id: string;
  title: string;
  severity: RecallSeverity;
  status: RecallStatus;
  reason: string;
  issuedAt: string;
};
