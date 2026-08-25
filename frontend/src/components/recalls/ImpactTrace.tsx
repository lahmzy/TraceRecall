import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { nodeTitle, relationshipCopy } from '@/lib/graph';
import type { GraphPath } from '@/types/graph';

export function ImpactTrace({ path }: { path?: GraphPath }) {
  if (!path || path.nodes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Impact Trace</CardTitle>
          <CardDescription>Select an affected product to inspect its graph path.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact Trace</CardTitle>
        <CardDescription>The returned Cypher path, translated into an investigation-friendly chain.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {path.nodes.map((node, index) => {
            const relationship = path.relationships[index];
            const isSource = index === 0;

            return (
              <div key={`${node.id}-${index}`}>
                <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
                  <div className={isSource ? 'mt-0.5 text-red-600' : 'mt-0.5 text-primary'}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-medium uppercase text-muted-foreground">{node.label}</div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-foreground">{nodeTitle(node)}</div>
                  </div>
                </div>
                {relationship ? (
                  <div className="ml-6 flex h-9 items-center gap-3 border-l border-primary/20 pl-5 text-[10px] sm:text-xs font-semibold uppercase text-primary">
                    {relationshipCopy(relationship.type)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
