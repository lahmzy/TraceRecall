'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { nodeTitle, pathSentence, relationshipCopy } from '@/lib/graph';
import type { GraphPath } from '@/types/graph';

export function WhyAffectedSheet({
  open,
  onOpenChange,
  title,
  path,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  path?: GraphPath;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Why affected?</SheetTitle>
          <SheetDescription>{title}</SheetDescription>
        </SheetHeader>
        {path ? (
          <div className="space-y-5">
            <p className="rounded-lg border bg-primary/10 p-4 text-xs sm:text-sm leading-5 sm:leading-6 text-primary">{pathSentence(path)}</p>
            <div className="space-y-3">
              {path.nodes.map((node, index) => {
                const relationship = path.relationships[index];
                return (
                  <div key={`${node.id}-${index}`}>
                    <div className="rounded-lg border bg-white p-4">
                      <div className="text-[10px] sm:text-xs font-medium uppercase text-muted-foreground">{node.label}</div>
                      <div className="mt-1 text-sm sm:text-base font-semibold text-slate-950">{nodeTitle(node)}</div>
                    </div>
                    {relationship ? (
                      <div className="px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase text-primary">
                        {relationshipCopy(relationship.type)}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground">No path is available for this entity yet.</p>
        )}
      </SheetContent>
    </Sheet>
  );
}
