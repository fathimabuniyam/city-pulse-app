import { useLocale } from '@/providers/LocaleProvider';
import axiosInstance from '@/services/axiosInstance';
import { LocaleTaskMaster } from '@/types/locale.types';
import { useQuery } from '@tanstack/react-query';
import { TASKMASTER_API_KEY } from '../../config';

const onGetEvent = async (id: string, locale: string) => {
  return await axiosInstance.get(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json`,
    {
      params: {
        apikey: TASKMASTER_API_KEY,
        locale,
      },
    },
  );
};

export const useGetEvent = (id: string) => {
  const { locale: currentLocale } = useLocale();
  const locale = LocaleTaskMaster[currentLocale];

  return useQuery({
    queryKey: ['onGetEvent', id],
    queryFn: () => onGetEvent(id, locale),
    enabled: !!id,
  });
};
