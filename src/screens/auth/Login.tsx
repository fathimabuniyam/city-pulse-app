import FormInput from '@/components/Form/FormInput';
import FormPassword from '@/components/Form/FormPassword';
import { buttonStyles } from '@/components/ui/Button';
import InternalLink from '@/components/ui/InternalLink';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import AuthLayout from '@/layouts/AuthLayout';
import { FormikHelper } from '@/types/form.types';
import { URLs } from '@/utils/URLs.util';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { loginRules } from './Auth.helper';

const Login = () => {
  // const { mutate: onLogin, isPending } = useLogin();

  const handleLogin = (values: any, helper: FormikHelper) => {
    // const { setErrors, resetForm } = helper;
    // onLogin(
    //   { data: values },
    //   {
    //     onSuccess: () => {
    //       handleOpenVerify();
    //       resetForm();
    //     },
    //     onError: (error: ErrorResponseType) => {
    //       setAPIFormErrors(setErrors, error);
    //     },
    //   },
    // );
  };

  return (
    <AuthLayout type="login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginRules}
        onSubmit={handleLogin}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormInput
              name="email"
              icon="email-outline"
              label={t('email_address')}
              keyboardType="email-address"
            />
            <FormPassword
              name="password"
              icon="lock-outline"
              label={t('password')}
            />

            <Button
              mode="contained"
              textColor={Colors.WHITE}
              style={[buttonStyles, styles.button]}
              onPress={() => handleSubmit()}
              // loading={isPending}
            >
              {t('sign_in')}
            </Button>

            <Text size={14} style={styles.footerText}>
              {t('dont_have_an_account')}{' '}
              <InternalLink
                color={Colors.PRIMARY}
                style={styles.footerTextLink}
                link={URLs.SignUp}
              >
                {t('sign_up')}
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
export default Login;
