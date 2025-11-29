import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRIC_EMAIL_KEY = 'biometric_email';

export const StorageUtils = {
  async saveBiometricEmail(email: string): Promise<void> {
    try {
      await AsyncStorage.setItem(BIOMETRIC_EMAIL_KEY, email);
    } catch (error) {
      console.error('Error saving biometric email:', error);
    }
  },

  async getBiometricEmail(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(BIOMETRIC_EMAIL_KEY);
    } catch (error) {
      console.error('Error getting biometric email:', error);
      return null;
    }
  },

  async clearBiometricEmail(): Promise<void> {
    try {
      await AsyncStorage.removeItem(BIOMETRIC_EMAIL_KEY);
    } catch (error) {
      console.error('Error clearing biometric email:', error);
    }
  },
};
