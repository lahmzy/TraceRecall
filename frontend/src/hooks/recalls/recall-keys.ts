export const recallKeys = {
  all: ['recalls'] as const,
  list: () => [...recallKeys.all, 'list'] as const,
  products: (recallId: string) => [...recallKeys.all, recallId, 'products'] as const,
  customers: (recallId: string) => [...recallKeys.all, recallId, 'customers'] as const,
  suppliers: (recallId: string) => [...recallKeys.all, recallId, 'suppliers'] as const,
  productPath: (recallId: string, productId: string) =>
    [...recallKeys.all, recallId, 'products', productId, 'path'] as const,
};
