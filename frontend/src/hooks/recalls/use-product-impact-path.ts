'use client';

import { useGetRequest } from '@/hooks/api/use-get-request';
import type { GraphPath } from '@/types/graph';
import { recallKeys } from './recall-keys';

export function useProductImpactPath(recallId: string, productId: string, enabled: boolean) {
  return useGetRequest<GraphPath[]>({
    queryKey: recallKeys.productPath(recallId, productId),
    url: `/recalls/${recallId}/products/${productId}/explain`,
    options: { enabled: Boolean(recallId && productId && enabled) },
  });
}
