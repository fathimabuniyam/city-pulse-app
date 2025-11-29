import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';

const onGetFavoriteIds = async (uid: string) => {
  const snap = await getDocs(
    collection(FIREBASE_DB, 'users', uid, 'favorites'),
  );
  return snap.docs.map((d) => d.id);
};

export const useGetFavoriteIds = () => {
  const uid = FIREBASE_AUTH.currentUser?.uid;

  return useQuery({
    queryKey: ['onGetFavoriteIds', uid],
    queryFn: () => onGetFavoriteIds(uid!),
    enabled: !!uid,
  });
};
