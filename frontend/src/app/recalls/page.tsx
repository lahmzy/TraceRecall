"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { RecallFilters } from "@/components/recalls/RecallFilters";
import { RecallTable } from "@/components/recalls/RecallTable";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useRecalls } from "@/hooks/recalls/use-recalls";
import type { RecallSeverity, RecallStatus } from "@/types/recall";

export default function RecallsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RecallStatus | "all">("all");
  const [severity, setSeverity] = useState<RecallSeverity | "all">("all");
  const recallsQuery = useRecalls();

  const filtered = useMemo(() => {
    return (recallsQuery.data ?? []).filter((recall) => {
      const text =
        `${recall.properties.title} ${recall.properties.reason}`.toLowerCase();
      return (
        text.includes(search.toLowerCase()) &&
        (status === "all" || recall.properties.status === status) &&
        (severity === "all" || recall.properties.severity === severity)
      );
    });
  }, [recallsQuery.data, search, severity, status]);

  return (
    <AppShell title="Recalls" subtitle="Search and open a recall investigation">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Recall Investigations
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-[13px] font-normal leading-5 sm:leading-6 text-muted-foreground">
            Start from an official recall and trace affected products,
            customers, and suppliers through the graph.
          </p>
        </section>

        <RecallFilters
          search={search}
          status={status}
          severity={severity}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSeverityChange={setSeverity}
        />

        {recallsQuery.isLoading ? <TableSkeleton /> : null}
        {recallsQuery.isError ? (
          <ErrorState onRetry={() => recallsQuery.refetch()} />
        ) : null}
        {recallsQuery.data && filtered.length === 0 ? (
          <EmptyState
            title="No recalls match your filters"
            description="Adjust the search, status, or severity filters to widen the investigation list."
          />
        ) : null}
        {filtered.length > 0 ? <RecallTable recalls={filtered} /> : null}
      </div>
    </AppShell>
  );
}
