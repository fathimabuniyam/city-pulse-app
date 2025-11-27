import { selectIsLoggedIn } from '@/store/reducers/auth-persist.reducer';
import { URLs } from '@/utils/URLs.util';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to ensure Redux is initialized
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isChecking) return;

    const publicRoutes = ['/auth/login', '/auth/signup'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isLoggedIn && isPublicRoute) {
      // If logged in and trying to access auth pages, redirect to home
      router.replace(URLs.Home);
    } else if (!isLoggedIn && !isPublicRoute) {
      // If not logged in and trying to access protected pages, redirect to login
      router.replace(URLs.Login);
    }
  }, [isLoggedIn, pathname, isChecking, router]);

  // Show loading while checking auth state
  if (isChecking || isLoggedIn === null) {
    return <ActivityIndicator size="large" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
