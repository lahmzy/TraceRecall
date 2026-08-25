'use client';

import { useGetRequest } from '@/hooks/api/use-get-request';
import type { GraphNode } from '@/types/graph';
import type { Recall } from '@/types/recall';
import { recallKeys } from './recall-keys';

export function useRecalls() {
  return useGetRequest<GraphNode<Recall>[]>({
    queryKey: recallKeys.list(),
    url: '/recalls',
  });
}
