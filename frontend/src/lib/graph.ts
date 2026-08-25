import type { GraphNode, GraphPath } from '@/types/graph';

export function nodeTitle(node: GraphNode) {
  const properties = node.properties as Record<string, unknown>;
  return String(properties.title ?? properties.name ?? properties.id ?? node.label);
}

export function relationshipCopy(type: string) {
  const labels: Record<string, string> = {
    AFFECTS: 'affects',
    PART_OF: 'part of',
    USED_IN: 'used in',
    PURCHASED: 'purchased',
    SUPPLIES: 'supplies',
    SOLD_BY: 'sold by',
  };

  return labels[type] ?? type.toLowerCase().replaceAll('_', ' ');
}

export function pathSentence(path: GraphPath) {
  if (path.nodes.length === 0) {
    return 'No graph path was returned for this entity.';
  }

  const names = path.nodes.map(nodeTitle);
  return `${names[0]} is connected through ${names.slice(1).join(' to ')}.`;
}
