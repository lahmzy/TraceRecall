"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AffectedEntitiesTabs } from "@/components/recalls/AffectedEntitiesTabs";
import { ImpactTrace } from "@/components/recalls/ImpactTrace";
import { RecallImpactSummary } from "@/components/recalls/RecallImpactSummary";
import { SeverityBadge } from "@/components/recalls/SeverityBadge";
import { StatusBadge } from "@/components/recalls/StatusBadge";
import { ErrorState } from "@/components/shared/error-state";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format";
import {
  useRecallCustomers,
  useRecallProducts,
  useRecallSuppliers,
} from "@/hooks/recalls/use-recall-impact";
import { useRecalls } from "@/hooks/recalls/use-recalls";

export default function RecallDetailPage({
  params,
}: {
  params: Promise<{ recallId: string }>;
}) {
  const { recallId } = use(params);
  const recallsQuery = useRecalls();
  const productsQuery = useRecallProducts(recallId);
  const customersQuery = useRecallCustomers(recallId);
  const suppliersQuery = useRecallSuppliers(recallId);

  const recall = recallsQuery.data?.find(
    (item) => item.properties.id === recallId,
  );
  const firstPath = productsQuery.data?.[0]?.paths[0];
  const componentCount = new Set(
    firstPath?.nodes
      ?.filter((node) => node.label === "Component")
      .map((node) => node.properties.id) ?? [],
  ).size;
  const isLoading =
    recallsQuery.isLoading ||
    productsQuery.isLoading ||
    customersQuery.isLoading ||
    suppliersQuery.isLoading;
  const isError =
    recallsQuery.isError ||
    productsQuery.isError ||
    customersQuery.isError ||
    suppliersQuery.isError;

  return (
    <AppShell
      title="Recall Detail"
      subtitle="Trace impact through connected supply-chain entities"
    >
      <div className="space-y-6">
        <Button asChild variant="ghost" size="sm" className="pl-0">
          <Link href="/recalls">
            <ArrowLeft className="h-4 w-4" /> Back to recalls
          </Link>
        </Button>

        {isLoading ? <TableSkeleton rows={4} /> : null}
        {isError ? <ErrorState /> : null}

        {recall ? (
          <>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={recall.properties.severity} />
                      <StatusBadge status={recall.properties.status} />
                      <span className="text-xs sm:text-[13px] font-normal text-muted-foreground">
                        Issued {formatDate(recall.properties.issuedAt)}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {recall.properties.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-xs sm:text-[13px] font-normal leading-5 sm:leading-6 text-muted-foreground">
                      {recall.properties.reason}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <RecallImpactSummary
              components={componentCount}
              products={productsQuery.data?.length ?? 0}
              customers={customersQuery.data?.length ?? 0}
              suppliers={suppliersQuery.data?.length ?? 0}
            />

            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <ImpactTrace path={firstPath} />
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                    Affected Entities
                  </h3>
                  <p className="text-xs sm:text-[13px] font-normal text-muted-foreground">
                    Each tab is populated from graph traversal results.
                  </p>
                </div>
                <Separator />
                <AffectedEntitiesTabs
                  products={productsQuery.data ?? []}
                  customers={customersQuery.data ?? []}
                  suppliers={suppliersQuery.data ?? []}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
