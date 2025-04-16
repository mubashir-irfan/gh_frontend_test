'use client'

import { ServerAPI } from '@/services';
import { APIError, QueryParams } from '@/types';
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosHeaderValue, AxiosResponse } from 'axios';

export const useGet = <T>(
  url: string,
  queryKey: string,
  enabled = true,
  params?: QueryParams,
  queryOptions?: Omit<
    UseQueryOptions<AxiosResponse, AxiosError<APIError>, T, [string, QueryParams?]>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<T, AxiosError<APIError>> => {
  return useQuery<AxiosResponse, AxiosError<APIError>, T, [string, QueryParams?]>({
    queryKey: params ? [queryKey, params] : [queryKey],
    queryFn: async () => await ServerAPI.get(url, { ...params }),
    enabled: enabled,
    ...queryOptions,
  });
};


type RequestPayload<T> = T;

export interface APIResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export const usePost = <T, D>(
  url: string,
  onSuccess: (response: T, variables: D) => void,
  onError?: (error: AxiosError<APIError>, variables: D) => void,
) => {
  return useMutation({
    mutationFn: async (data?: RequestPayload<D>): Promise<T> => await ServerAPI.post(url, data),
    onSuccess,
    onError,
  });
};

export const usePatch = <T, D>(
  url: string,
  onSuccess: (data: T, variables: D) => void,
  onError?: (error: AxiosError<APIError>, variables: D) => void,
) => {
  return useMutation({
    mutationFn: async (data: RequestPayload<D>): Promise<T> => await ServerAPI.patch(url, data),
    onSuccess,
    onError,
  });
};

export const usePut = <T, D>(
  url: string,
  onSuccess?: (data: T, variables: D) => void,
  onError?: (error: AxiosError<APIError>) => void,
  customHeaders?: Record<string, AxiosHeaderValue>,
) => {
  return useMutation({
    mutationFn: async (data: RequestPayload<D>): Promise<T> =>
      await ServerAPI.put(url, data, customHeaders),
    onSuccess,
    onError,
  });
};

export const useDelete = <T, D>(
  url: string,
  onSuccess: (data: T, variables: D) => void,
  onError: (error: AxiosError<APIError>) => void,
) => {
  return useMutation({
    mutationFn: async (): Promise<T> => {
      return await ServerAPI.delete(url);
    },
    onSuccess,
    onError,
  });
};
