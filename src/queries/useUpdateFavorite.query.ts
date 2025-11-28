import { t } from '@/i18n';
import { errorToast } from '@/utils/Toasts.util';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';

export const addFavorite = async (uid: string, eventId: string) => {
  await setDoc(doc(FIREBASE_DB, 'users', uid, 'favorites', eventId), {
    savedAt: Date.now(),
  });
};

export const removeFavorite = async (uid: string, eventId: string) => {
  await deleteDoc(doc(FIREBASE_DB, 'users', uid, 'favorites', eventId));
};

type UpdateEventBody = {
  eventId: string;
  isFavorite: boolean;
};

export const useUpdateFavorite = () => {
  const client = useQueryClient();
  const uid = FIREBASE_AUTH.currentUser?.uid;

  return useMutation({
    mutationKey: ['onUpdateFavorite'],
    mutationFn: async ({ eventId, isFavorite }: UpdateEventBody) => {
      if (!uid) {
        errorToast(t('user_not_authenticated'));
        return;
      }

      if (isFavorite) {
        await removeFavorite(uid, eventId);
      } else {
        await addFavorite(uid, eventId);
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['onGetFavoriteIds'] });
      client.invalidateQueries({ queryKey: ['favoriteEvents'] });
    },
  });
};
