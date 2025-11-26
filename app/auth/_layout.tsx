import { selectIsLoggedIn } from '@/store/reducers/auth-persist.reducer';
import { URLs } from '@/utils/URLs.util';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AuthRedirectLayout() {
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn === null) return;

    if (isLoggedIn) router.replace(URLs.Home);
  }, [isLoggedIn]);

  return <Slot />;
}
