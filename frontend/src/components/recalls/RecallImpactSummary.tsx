import { Boxes, Factory, PackageCheck, Users } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';

export function RecallImpactSummary({
  products,
  customers,
  suppliers,
  components,
}: {
  products: number;
  customers: number;
  suppliers: number;
  components: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      <MetricCard title="Affected Components" value={components} icon={Boxes} note="Nested parts and assemblies" accent="bg-violet-500" />
      <MetricCard title="Affected Products" value={products} icon={PackageCheck} note="Finished goods reached by traversal" accent="bg-primary" />
      <MetricCard title="Potential Customers" value={customers} icon={Users} note="Fictional purchasers in seed data" accent="bg-blue-500" />
      <MetricCard title="Suppliers Connected" value={suppliers} icon={Factory} note="Direct or assembly-level suppliers" accent="bg-amber-500" />
    </div>
  );
}
