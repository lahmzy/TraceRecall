'use client';

import { useGetRequest } from '@/hooks/api/use-get-request';
import type { AffectedCustomer } from '@/types/customer';
import type { AffectedProduct } from '@/types/product';
import type { ConnectedSupplier } from '@/types/supplier';
import { recallKeys } from './recall-keys';

export function useRecallProducts(recallId: string) {
  return useGetRequest<AffectedProduct[]>({
    queryKey: recallKeys.products(recallId),
    url: `/recalls/${recallId}/products`,
    options: { enabled: Boolean(recallId) },
  });
}

export function useRecallCustomers(recallId: string) {
  return useGetRequest<AffectedCustomer[]>({
    queryKey: recallKeys.customers(recallId),
    url: `/recalls/${recallId}/customers`,
    options: { enabled: Boolean(recallId) },
  });
}

export function useRecallSuppliers(recallId: string) {
  return useGetRequest<ConnectedSupplier[]>({
    queryKey: recallKeys.suppliers(recallId),
    url: `/recalls/${recallId}/suppliers`,
    options: { enabled: Boolean(recallId) },
  });
}
