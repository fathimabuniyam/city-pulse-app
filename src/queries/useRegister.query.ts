import { t } from '@/i18n';
import { errorToast, successToast } from '@/utils/Toasts.util';
import { URLs } from '@/utils/URLs.util';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase';

interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
}

const onRegister = async (data: RegisterCredentials): Promise<any> => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      data?.email,
      data?.password,
    );

    // Update the Firebase User profile with name
    await updateProfile(response.user, {
      displayName: data.displayName,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['onRegister'],
    mutationFn: (data: RegisterCredentials) => onRegister(data),
    onSuccess: async () => {
      router.push(URLs.Login);
      successToast(t('you_are_registered_successfully_please_login_to_co'));
    },
    onError: (error: any) => {
      errorToast(
        error?.message || error?.code || t('registration_failed_try_again'),
      );
    },
  });

  return mutation;
};
const aa = {
  _tokenResponse: {
    email: 'fathima@nova.com',
    expiresIn: '3600',
    idToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjNzQ5NTFmNjBhMDE0NzE3ZjFlMzA4ZDZiMjgwZjQ4ZjFlODhmZGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2l0eS1wdWxzZS1hcHAtMjYxMTIwMjUiLCJhdWQiOiJjaXR5LXB1bHNlLWFwcC0yNjExMjAyNSIsImF1dGhfdGltZSI6MTc2NDI0NDk2MywidXNlcl9pZCI6InRZMUkzdXRybUxnN0lBRUFIaE90b0hUdW9PTDIiLCJzdWIiOiJ0WTFJM3V0cm1MZzdJQUVBSGhPdG9IVHVvT0wyIiwiaWF0IjoxNzY0MjQ0OTYzLCJleHAiOjE3NjQyNDg1NjMsImVtYWlsIjoiZmF0aGltYUBub3ZhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJmYXRoaW1hQG5vdmEuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mtjmqDjFL3IPpzRNEghNMHlr1nPMbJ2cAWxNmJPWOfh41Kh-k467Jvgl4QRfmjPwVGBBklhawcxMc-tTDCnQURdZuworgryp4eIXZbW7W1uZ3ZUM8ZBFuWx29rNgxYYEJMUDKu0QnAEE-yLNW1axSzD-iAovLF5MGWLXPE3kNAh2PuCDlyLEXiB2CF2LUSGaXx07g1Q6DT8LFFJS9K0O77vEPFU4-96jE7EKDur1UUUbfYFjrfsoDR8BjV--ccsf7IWk2j6mxM5wE6qO4ILOes_j_zMdkI19A5Th_2Jo7wZMwl5QcJD3wnQV9GHvO6V_foZuhGI9dwgKBPwHgGaZxg',
    kind: 'identitytoolkit#SignupNewUserResponse',
    localId: 'tY1I3utrmLg7IAEAHhOtoHTuoOL2',
    refreshToken:
      'AMf-vBxweHiu21VAP5JpCro5KtCqhCRsysqMFN69dKc_hNXkP5QmfnHxCJ1FMvLkwMFXzYFb4o3OdHLmzeFFh_hgvFCre1REoQqIwZGor2f10KaT4BJ4ngOj52eeWEdNh_veZQEgx0xKR0xV4-LQhXBSyvvar0Ev4VrF6vg4wUOiIUa2WiKhnc9_LZi880mnsN-AyzBWOqC-Lqm5CycZNfguNX7nuko6TrFSGPpFgvrmPSXB0m6mAYs',
  },
  operationType: 'signIn',
  providerId: null,
  user: {
    _redirectEventId: undefined,
    apiKey: 'AIzaSyDl3-ivO8IZVO5bWVnXS2Vb3xYRp0i7OXg',
    appName: '[DEFAULT]',
    createdAt: '1764244963636',
    displayName: 'Afsasaasf',
    email: 'fathima@nova.com',
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: '1764244963636',
    phoneNumber: undefined,
    photoURL: undefined,
    providerData: [Array],
    stsTokenManager: [Object],
    tenantId: undefined,
    uid: 'tY1I3utrmLg7IAEAHhOtoHTuoOL2',
  },
};
