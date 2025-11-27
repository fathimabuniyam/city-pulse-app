import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { TASKMASTER_API_KEY } from '../../config';

const onGetAllEvents = async (keyword: string, city: string) => {
  return await axiosInstance.get(
    `https://app.ticketmaster.com/discovery/v2/events.json`,
    {
      params: {
        size: 20, // fetch 20 events per request
        keyword: keyword || undefined,
        city: city || undefined,
        apikey: TASKMASTER_API_KEY,
      },
    },
  );
};

export const useGetAllEvents = (keyword: string, city: string) => {
  return useQuery({
    queryKey: ['events', keyword, city], // important for caching
    queryFn: () => onGetAllEvents(keyword, city),
    retry: false,
    select(data: any) {
      return data?._embedded?.events ?? [];
    },
  });
};
