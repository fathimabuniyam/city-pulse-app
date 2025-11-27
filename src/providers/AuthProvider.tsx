import PageLoader from '@/components/ui/PageLoader';
import { URLs } from '@/utils/URLs.util';
import { usePathname, useRouter } from 'expo-router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../firebase';

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
  loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await signOut(FIREBASE_AUTH);
    setUser(null);
    router.replace(URLs.Login);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) return;

    const publicRoutes = ['/auth/login', '/auth/signup'];
    const isPublic = publicRoutes.includes(pathname);

    if (user && isPublic) {
      // Logged in - redirect inside apps
      router.replace(URLs.Home);
    } else if (!user && !isPublic) {
      // Not logged in - redirect to login
      router.replace(URLs.Login);
    }
  }, [user, pathname, loading]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
