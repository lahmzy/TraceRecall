'use client';

import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/axios';

type UseGetRequestInput<TResponse> = {
  queryKey: QueryKey;
  url: string;
  params?: Record<string, string | number | boolean | undefined>;
  options?: Omit<UseQueryOptions<TResponse, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetRequest<TResponse>({
  queryKey,
  url,
  params,
  options,
}: UseGetRequestInput<TResponse>) {
  return useQuery<TResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<TResponse>(url, { params });
      return response.data;
    },
    ...options,
  });
}
