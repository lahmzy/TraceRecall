import type { Node, Path, Relationship } from 'neo4j-driver';

export interface GraphNode {
  id: string;
  label: string;
  properties: Record<string, unknown>;
}

export interface GraphRelationship {
  id: string;
  type: string;
  startId: string;
  endId: string;
  properties: Record<string, unknown>;
}

export interface GraphPath {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

export function toNative(value: unknown): unknown {
  if (value && typeof value === 'object' && 'toNumber' in value) {
    return (value as { toNumber: () => number }).toNumber();
  }

  if (Array.isArray(value)) {
    return value.map(toNative);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, toNative(item)]),
    );
  }

  return value;
}

export function mapNode(node: Node): GraphNode {
  return {
    id: node.elementId,
    label: node.labels[0] ?? 'Node',
    properties: toNative(node.properties) as Record<string, unknown>,
  };
}

export function mapRelationship(relationship: Relationship): GraphRelationship {
  return {
    id: relationship.elementId,
    type: relationship.type,
    startId: relationship.startNodeElementId,
    endId: relationship.endNodeElementId,
    properties: toNative(relationship.properties) as Record<string, unknown>,
  };
}

export function mapPath(path: Path): GraphPath {
  const nodes = new Map<string, GraphNode>();
  const relationships = new Map<string, GraphRelationship>();

  for (const segment of path.segments) {
    nodes.set(segment.start.elementId, mapNode(segment.start));
    nodes.set(segment.end.elementId, mapNode(segment.end));
    relationships.set(segment.relationship.elementId, mapRelationship(segment.relationship));
  }

  if (path.start) {
    nodes.set(path.start.elementId, mapNode(path.start));
  }

  if (path.end) {
    nodes.set(path.end.elementId, mapNode(path.end));
  }

  return {
    nodes: [...nodes.values()],
    relationships: [...relationships.values()],
  };
}
