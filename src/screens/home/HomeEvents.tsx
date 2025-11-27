import EventCard from '@/components/EventCard';
import { useGetAllEvents } from '@/queries/useGetAllEvents.query';
import { FlatList } from 'react-native';

interface HomeEventsProps {
  keyword: string;
  city: string;
}

const HomeEvents = ({ keyword, city }: HomeEventsProps) => {
  const { data: events } = useGetAllEvents(keyword, city);

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <EventCard event={item} />}
    />
  );
};

export default HomeEvents;
