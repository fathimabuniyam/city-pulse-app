import { useLocale } from '@/providers/LocaleProvider';
import axiosInstance from '@/services/axiosInstance';
import { LocaleTaskMaster } from '@/types/locale.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TASKMASTER_API_KEY } from '../../config';

type EventFilters = {
  keyword?: string;
  city?: string;
  size?: number;
};

const onGetAllEvents = async ({ pageParam = 0, filters, locale }: any) => {
  const response: any = await axiosInstance.get(
    `https://app.ticketmaster.com/discovery/v2/events.json`,
    {
      params: {
        size: filters.size || 20,
        page: pageParam,
        keyword: filters.keyword || undefined,
        city: filters.city || undefined,
        apikey: TASKMASTER_API_KEY,
        locale,
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
  const { locale: currentLocale } = useLocale();
  const locale = LocaleTaskMaster[currentLocale];

  return useInfiniteQuery({
    queryKey: ['events', filters],
    queryFn: ({ pageParam = 0 }) =>
      onGetAllEvents({ pageParam, filters, locale }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    retry: false,
  });
};
