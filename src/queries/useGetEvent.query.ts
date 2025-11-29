import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { TASKMASTER_API_KEY } from '../../config';

const onGetEvent = async (id: string) => {
  return await axiosInstance.get(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json`,
    { params: { apikey: TASKMASTER_API_KEY } },
  );
};

export const useGetEvent = (id: string) => {
  return useQuery({
    queryKey: ['onGetEvent', id],
    queryFn: () => onGetEvent(id!),
    enabled: !!id,
  });
};
