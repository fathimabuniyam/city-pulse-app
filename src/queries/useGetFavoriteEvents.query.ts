import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TASKMASTER_API_KEY } from '../../config';

export const onGetFavoriteEvents = async (ids: string[]) => {
  if (!ids.length) return [];

  return await axios.get(
    'https://app.ticketmaster.com/discovery/v2/events.json',
    {
      params: {
        apikey: TASKMASTER_API_KEY,
        id: ids.join(','),
      },
    },
  );
};

export const useGetFavoriteEvents = (eventIds: string[]) => {
  return useQuery({
    queryKey: ['onGetFavoriteEvents', eventIds],
    queryFn: () => onGetFavoriteEvents(eventIds),
    enabled: eventIds.length > 0,
    select(data: any) {
      return data?.data?._embedded?.events || [];
    },
  });
};
