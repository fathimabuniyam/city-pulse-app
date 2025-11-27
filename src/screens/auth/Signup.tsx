import FormInput from '@/components/Form/FormInput';
import FormPassword from '@/components/Form/FormPassword';
import { buttonStyles } from '@/components/ui/Button';
import InternalLink from '@/components/ui/InternalLink';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import AuthLayout from '@/layouts/AuthLayout';
import { useRegister } from '@/queries/useRegister.query';
import { FormikHelper } from '@/types/form.types';
import { URLs } from '@/utils/URLs.util';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { signupRules } from './Auth.helper';

const Signup = () => {
  const initialValues = {
    displayName: '',
    email: '',
    password: '',
  };
  const { mutate: onRegister, isPending } = useRegister();

  const handleRegister = (values: any, helper: FormikHelper) => {
    const { setErrors, resetForm } = helper;
    onRegister(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <AuthLayout type="signup">
      <Formik
        initialValues={initialValues}
        validationSchema={signupRules}
        onSubmit={handleRegister}
      >
        {({ handleSubmit, ...formikProps }) => (
          <View style={styles.container}>
            <FormInput
              name="displayName"
              icon="account-outline"
              label={t('full_name')}
              autoCapitalize="words"
            />
            <FormInput
              name="email"
              icon="email-outline"
              label={t('email_address')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormPassword
              name="password"
              icon="lock-outline"
              label={t('password')}
              autoCapitalize="none"
            />

            <Button
              mode="contained"
              textColor={Colors.WHITE}
              style={[buttonStyles, styles.button]}
              onPress={() => handleSubmit()}
              loading={isPending}
              disabled={isPending}
            >
              {isPending ? t('please_wait') : t('register')}
            </Button>

            <Text size={14} style={styles.footerText}>
              {t('already_have_an_account')}{' '}
              <InternalLink
                color={Colors.PRIMARY}
                style={styles.footerTextLink}
                link={URLs.Login}
              >
                {t('sign_in')}
              </InternalLink>
            </Text>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    verticalAlign: 'middle',
    marginHorizontal: 'auto',
    marginVertical: 20,
  },
  footerTextLink: {
    fontSize: 14,
    marginBottom: -6,
  },
  button: {
    fontSize: 16,
    marginTop: 15,
  },
});
export default Signup;
