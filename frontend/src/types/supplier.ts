import type { GraphNode, GraphPath } from './graph';

export type Supplier = {
  id: string;
  name: string;
  country: string;
};

export type ComponentPart = {
  id: string;
  name: string;
  type: string;
  description: string;
};

export type ConnectedSupplier = {
  supplier: GraphNode<Supplier>;
  component: GraphNode<ComponentPart>;
  supplyPath: GraphPath;
  componentPath: GraphPath;
};
