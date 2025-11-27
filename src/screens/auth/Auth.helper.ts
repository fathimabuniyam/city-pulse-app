import { t } from '@/i18n';
import * as Yup from 'yup';

export const REGEX_PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;

export const loginRules = Yup.object().shape({
  email: Yup.string().email(t('invalid_email')).required(t('required')),
  password: Yup.string().required(t('required')),
});

export const signupRules = Yup.object({
  full_name: Yup.string()
    .trim()
    .required(t('required'))
    .min(2, t('minimum_value_characters', { value: 2 }))
    .max(100, t('maximum_value_characters', { value: 100 })),

  email: Yup.string()
    .trim()
    .email(t('invalid_email'))
    .required(t('required'))
    .max(100, t('maximum_value_characters', { value: 100 })),

  password: Yup.string()
    .required(t('required'))
    .min(8, t('minimum_value_characters', { value: 8 }))
    .max(50, t('maximum_value_characters', { value: 50 }))
    .matches(REGEX_PASSWORD_PATTERN, {
      message: t('must_contain_at_least_one_uppercase_letter_one_low'),
      excludeEmptyString: true,
    }),
});
