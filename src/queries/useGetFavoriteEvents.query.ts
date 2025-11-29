import { useLocale } from '@/providers/LocaleProvider';
import { LocaleTaskMaster } from '@/types/locale.types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TASKMASTER_API_KEY } from '../../config';

export const onGetFavoriteEvents = async (ids: string[], locale: string) => {
  if (!ids.length) return [];

  return await axios.get(
    'https://app.ticketmaster.com/discovery/v2/events.json',
    {
      params: {
        apikey: TASKMASTER_API_KEY,
        id: ids.join(','),
        locale,
      },
    },
  );
};

export const useGetFavoriteEvents = (eventIds: string[]) => {
  const { locale: currentLocale } = useLocale();
  const locale = LocaleTaskMaster[currentLocale];

  return useQuery({
    queryKey: ['onGetFavoriteEvents', eventIds],
    queryFn: () => onGetFavoriteEvents(eventIds, locale),
    enabled: eventIds.length > 0,
    select(data: any) {
      return data?.data?._embedded?.events || [];
    },
  });
};
