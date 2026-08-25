export type NodeLabel = 'Recall' | 'Component' | 'Product' | 'Supplier' | 'Retailer' | 'Customer';

export type GraphNode<TProperties extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  label: NodeLabel | string;
  properties: TProperties;
};

export type GraphRelationship = {
  id: string;
  type: 'AFFECTS' | 'SUPPLIES' | 'PART_OF' | 'USED_IN' | 'SOLD_BY' | 'PURCHASED' | string;
  startId: string;
  endId: string;
  properties: Record<string, unknown>;
};

export type GraphPath = {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
};
