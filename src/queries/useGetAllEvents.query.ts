import axiosInstance from '@/services/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TASKMASTER_API_KEY } from '../../config';

type EventFilters = {
  keyword?: string;
  city?: string;
  size?: number;
};

const onGetAllEvents = async ({ pageParam = 0, filters }: any) => {
  const response: any = await axiosInstance.get(
    `https://app.ticketmaster.com/discovery/v2/events.json`,
    {
      params: {
        size: filters.size || 20,
        page: pageParam,
        keyword: filters.keyword || undefined,
        city: filters.city || undefined,
        apikey: TASKMASTER_API_KEY,
      },
    },
  );

  return {
    events: response._embedded?.events ?? [],
    hasMore: pageParam < (response.page?.totalPages ?? 0) - 1,
    nextPage: pageParam + 1,
  };
};

export const useGetAllEvents = (filters: EventFilters) => {
  return useInfiniteQuery({
    queryKey: ['events', filters],
    queryFn: ({ pageParam = 0 }) => onGetAllEvents({ pageParam, filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    retry: false,
  });
};
