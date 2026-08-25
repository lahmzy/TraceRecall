"use client";

import Link from "next/link";
import { AlertTriangle, Factory, PackageCheck, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { RecallTable } from "@/components/recalls/RecallTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecalls } from "@/hooks/recalls/use-recalls";
import {
  useRecallCustomers,
  useRecallProducts,
  useRecallSuppliers,
} from "@/hooks/recalls/use-recall-impact";

export default function DashboardPage() {
  const recallsQuery = useRecalls();
  const firstRecallId = recallsQuery.data?.[0]?.properties.id ?? "";
  const productsQuery = useRecallProducts(firstRecallId);
  const customersQuery = useRecallCustomers(firstRecallId);
  const suppliersQuery = useRecallSuppliers(firstRecallId);

  const activeRecalls =
    recallsQuery.data?.filter(
      (recall) => recall.properties.status === "active",
    ) ?? [];

  return (
    <AppShell
      title="Recall Overview"
      subtitle="Operational impact view across active graph-backed recalls"
    >
      <div className="space-y-6">
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Recall Overview
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-[13px] font-normal leading-5 sm:leading-6 text-muted-foreground">
              Monitor active recalls and quickly trace which products,
              suppliers, and customers are connected downstream.
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/recalls">Open investigations</Link>
          </Button>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <MetricCard
            title="Active Recalls"
            value={activeRecalls.length}
            icon={AlertTriangle}
            note="Open investigations requiring review"
            accent="bg-red-500"
          />
          <MetricCard
            title="Affected Products"
            value={productsQuery.data?.length ?? "-"}
            icon={PackageCheck}
            note="From the latest seeded recall"
            accent="bg-primary"
          />
          <MetricCard
            title="Potential Customers"
            value={customersQuery.data?.length ?? "-"}
            icon={Users}
            note="Connected through purchases"
            accent="bg-blue-500"
          />
          <MetricCard
            title="Suppliers Involved"
            value={suppliersQuery.data?.length ?? "-"}
            icon={Factory}
            note="Upstream connected parties"
            accent="bg-amber-500"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                Active Recalls
              </h3>
              <p className="text-xs sm:text-[13px] font-normal text-muted-foreground">
                Click a row to open its impact trace.
              </p>
            </div>
            {recallsQuery.isLoading ? <TableSkeleton /> : null}
            {recallsQuery.isError ? (
              <ErrorState onRetry={() => recallsQuery.refetch()} />
            ) : null}
            {recallsQuery.data && activeRecalls.length === 0 ? (
              <EmptyState
                title="No active recalls found"
                description="The seeded graph currently has no active investigations."
              />
            ) : null}
            {activeRecalls.length > 0 ? (
              <RecallTable recalls={activeRecalls} />
            ) : null}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact Overview</CardTitle>
              <CardDescription>
                Latest active recall traversal snapshot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-red-50 p-4">
                <div className="text-xs font-semibold uppercase text-red-700">
                  Source
                </div>
                <div className="mt-1 text-sm sm:text-base font-bold text-foreground">
                  {recallsQuery.data?.[0]?.properties.title ??
                    "No recall selected"}
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Products reached</span>
                  <strong className="text-slate-950">
                    {productsQuery.data?.length ?? "-"}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Customers reached</span>
                  <strong className="text-slate-950">
                    {customersQuery.data?.length ?? "-"}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Suppliers connected</span>
                  <strong className="text-slate-950">
                    {suppliersQuery.data?.length ?? "-"}
                  </strong>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
