import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { errorToast, successToast } from '@/utils/Toasts.util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

export const BIOMETRIC_EMAIL_KEY = 'biometric_email';

interface Props {
  savedEmail: any;
  setSavedEmail: (email: any) => void;
  onLogin: (data: any) => void;
  isPending: boolean;
}

const LoginBiometric = ({
  savedEmail,
  setSavedEmail,
  onLogin,
  isPending,
}: Props) => {
  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      // Always check for saved email, even if biometric not supported
      const email = await AsyncStorage.getItem(BIOMETRIC_EMAIL_KEY);
      setSavedEmail(email);
    } catch (error) {
      console.error('Error checking biometric:', error);
      setSavedEmail(null);
    }
  };

  const handleBiometricLogin = async () => {
    if (!savedEmail) {
      errorToast(
        t('please_login_with_email_and_password_first'),
        t('no_saved_account'),
      );
      return;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t('authenticate_to_login'),
        fallbackLabel: t('use_password'),
        disableDeviceFallback: false,
      });

      if (result.success) {
        Alert.prompt(
          t('biometric_login'),
          `${t('enter_password_for')} ${savedEmail}`,
          [
            { text: t('cancel'), style: 'cancel' },
            {
              text: t('login'),
              onPress: (password: any) => {
                if (password) {
                  onLogin({ email: savedEmail, password });
                }
              },
            },
          ],
          'secure-text',
        );
      } else {
        errorToast(
          t('biometric_authentication_was_cancelled_or_failed'),
          t('authentication_failed'),
        );
      }
    } catch (error) {
      console.error('Biometric error:', error);
      errorToast(t('biometric_authentication_failed'));
    }
  };

  const deleteBiometricData = async () => {
    try {
      await AsyncStorage.removeItem(BIOMETRIC_EMAIL_KEY);
      setSavedEmail(null);
      successToast(t('biometric_login_data_has_been_deleted'));
    } catch (error) {
      errorToast(t('failed_to_delete_biometric_data'));
    }
  };
  return (
    <>
      <Button
        mode="outlined"
        style={styles.biometricButton}
        onPress={handleBiometricLogin}
        disabled={isPending}
      >
        <MaterialDesignIcons
          name="fingerprint"
          size={24}
          color={Colors.PRIMARY}
        />
        <Text style={styles.biometricButtonText}>
          {t('sign_in_with_biometrics')}
        </Text>
      </Button>
      {savedEmail && (
        <>
          <Text color={Colors.TEXT_SECONDARY} size={11} align="center">
            {t('biometrics_saved_for')} {savedEmail}
          </Text>
          <TouchableOpacity onPress={deleteBiometricData}>
            <Text size={11} color={Colors.RED} align="center">
              {t('delete_biometric_data')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    gap: 10,
  },
  biometricButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginBiometric;
