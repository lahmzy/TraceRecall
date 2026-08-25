'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/format';
import type { GraphNode } from '@/types/graph';
import type { Recall } from '@/types/recall';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';

export function RecallTable({ recalls }: { recalls: GraphNode<Recall>[] }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-2 sm:p-3">
        <div className="overflow-x-auto rounded-lg bg-slate-50/60">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200/70 hover:bg-transparent">
                <TableHead className="min-w-[140px]">Recall</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Issued</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recalls.map((recall) => (
                <TableRow key={recall.properties.id} className="border-slate-200/50 bg-white hover:bg-slate-50/80">
                  <TableCell>
                    <Link href={`/recalls/${recall.properties.id}`} className="block">
                      <div className="text-xs sm:text-sm font-semibold text-foreground">{recall.properties.title}</div>
                      <div className="mt-0.5 max-w-xl truncate text-[11px] sm:text-[13px] font-normal text-muted-foreground">{recall.properties.reason}</div>
                      <div className="mt-1 text-[10px] text-muted-foreground sm:hidden">
                        Issued {formatDate(recall.properties.issuedAt)}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={recall.properties.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={recall.properties.status} />
                  </TableCell>
                  <TableCell className="hidden text-xs sm:table-cell sm:text-[13px] font-normal text-muted-foreground">
                    {formatDate(recall.properties.issuedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
                      <Link href={`/recalls/${recall.properties.id}`}>
                        <span className="hidden sm:inline">Trace</span> <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

