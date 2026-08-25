import type { GraphNode, GraphPath } from './graph';
import type { Product } from './product';

export type Customer = {
  id: string;
  name: string;
  city: string;
  country: string;
};

export type AffectedCustomer = {
  customer: GraphNode<Customer>;
  product: GraphNode<Product>;
  path: GraphPath;
};
