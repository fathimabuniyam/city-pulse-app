import { useAuth } from '@/providers/AuthProvider';
import { Text, View } from 'react-native';

const Home = () => {
  const { user } = useAuth();
  console.log('user : ', user);

  return (
    <View>
      <View>
        <Text>Discover Events</Text>
        <Text>Find events in your location</Text>
      </View>

      <View></View>
    </View>
  );
};

const aa = {
  _redirectEventId: undefined,
  apiKey: 'AIzaSyDl3-ivO8IZVO5bWVnXS2Vb3xYRp0i7OXg',
  appName: '[DEFAULT]',
  createdAt: '1764245514090',
  displayName: 'Fathima OB',
  email: 'fathima@yopmail.com',
  emailVerified: false,
  isAnonymous: false,
  lastLoginAt: '1764245514090',
  phoneNumber: undefined,
  photoURL: undefined,
  providerData: [[Object]],
  stsTokenManager: {
    accessToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjNzQ5NTFmNjBhMDE0NzE3ZjFlMzA4ZDZiMjgwZjQ4ZjFlODhmZGEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRmF0aGltYSBPQiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaXR5LXB1bHNlLWFwcC0yNjExMjAyNSIsImF1ZCI6ImNpdHktcHVsc2UtYXBwLTI2MTEyMDI1IiwiYXV0aF90aW1lIjoxNzY0MjQ1NTQwLCJ1c2VyX2lkIjoibTFuYUtFNjA1alBlSURNSFNhazV0RW1WYUVQMiIsInN1YiI6Im0xbmFLRTYwNWpQZUlETUhTYWs1dEVtVmFFUDIiLCJpYXQiOjE3NjQyNDU1NDAsImV4cCI6MTc2NDI0OTE0MCwiZW1haWwiOiJmYXRoaW1hQHlvcG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImZhdGhpbWFAeW9wbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.IkXY9Hh7Dv-nczrKwV95gJXPoS7cY3KmDl-sBGoC_FMaj4M2zJkwSZFqeDpR056ylX7nY1Kc79knTe7-tKvlZokw9l-gMWlAgBlgYr1A3ygtqffZ6RoRAJ_Xuo-Q5TO82kPBphYycBTcYtY2OrAGS1M6sI4a0aIaLMxCC1lAZeKb3T-UThrVTHa8YUO2BZOG_9Gd2alvbOsI9642HXdrs_D7DsIzVkPWtboV3gZ4sAZOUXVmKFsZf7OGge3PL3EjmFoA8WKwzR4_A3dS49BriEn2q_2Zbt348-CZjJD3M7Q90ucFtNjZQCPKDPxW-tKLfOODCD8QoJOixPb5q82XmQ',
    expirationTime: 1764249140157,
    refreshToken:
      'AMf-vBzL74RpSvhshAWIWTcXljR6FKtC2vZSsEeGjliTlRDnIkBPRKO0g5qRJQVkLLjl6BE6d-WEZsewxybwDsL57S-hax09HuuEe_v7a4PlLbtQ-BYvmmHB_htBGdUkblWkAzPJhQA5oYaAEwWw-WEtH-Y3UZqn0mmjwha6GW74u1ys9wXN_w1zxcpgJhRN1QGmQYPTaL5-M8a4ZA_t3CHzalMotBZdBfbahC9wnckX_iC28xNoDnxoUFA0qgnFXu85GqMGYSyk',
  },
  tenantId: undefined,
  uid: 'm1naKE605jPeIDMHSak5tEmVaEP2',
};

export default Home;
