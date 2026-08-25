export type Product = {
  id: string;
  name: string;
  category: string;
  sku: string;
};

export type AffectedProduct = {
  product: import('./graph').GraphNode<Product>;
  paths: import('./graph').GraphPath[];
};
