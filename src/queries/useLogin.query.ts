import { t } from '@/i18n';
import { errorToast, successToast } from '@/utils/Toasts.util';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
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
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['onLogin'],
    mutationFn: (data: LoginCredentials) => onLogin(data),
    onSuccess: async (response: UserCredential) => {
      try {
        // Firebase automatically manages the user session, so no need to store tokens manually

        successToast(t('login_successful'));
        router.replace('/');
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
