import { t } from '@/i18n';
import { errorToast } from '@/utils/Toasts.util';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
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
  const mutation = useMutation({
    mutationKey: ['onLogin'],
    mutationFn: (data: LoginCredentials) => onLogin(data),
    onSuccess: async (response: UserCredential) => {
      // Firebase automatically manages the user session, so no need to store tokens manually
    },
    onError: (error: any) => {
      errorToast(
        error?.message || error?.code || t('invalid_credentials_try_again'),
      );
    },
  });

  return mutation;
};
