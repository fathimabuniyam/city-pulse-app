import { t } from '@/i18n';
import { setToken } from '@/store/reducers/auth-persist.reducer';
import { errorToast } from '@/utils/Toasts.util';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { FIREBASE_AUTH } from '../../firebase';

interface LoginCredentials {
  email: string;
  password: string;
}

const onLogin = async (data: LoginCredentials): Promise<UserCredential> => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      data.email,
      data.password,
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const useLogin = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ['onLogin'],
    mutationFn: (data: LoginCredentials) => onLogin(data),
    onSuccess: async (response: UserCredential) => {
      try {
        const token = await response.user.getIdToken();
        dispatch(setToken(token));
      } catch (err) {
        errorToast(t('token_error_try_again'));
      }
    },
    onError: (error: any) => {
      errorToast(
        error?.message || error?.code || t('invalid_credentials_try_again'),
      );
    },
  });

  return mutation;
};
