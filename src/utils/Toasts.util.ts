import { t } from '@/i18n';
import Toast from 'react-native-toast-message';

enum ToastPositionEnums {
  top = 'top',
  bottom = 'bottom',
}

export const TOAST_POSITION = ToastPositionEnums.bottom;

const TIME = 5000;

/**
 * Success Toast
 * @param {String} message Secondary Text [default: null]
 * @param {String} title Primary Text [default: Success]
 * @example errorToast(message, title)
 */
export const successToast = (message: string, title?: string) =>
  Toast.show({
    type: 'success',
    text1: title || t('success'),
    text2: message,
    visibilityTime: TIME,
  });

/**
 * Error Toast
 * @param {String} message Secondary Text
 * @param {String} title Primary Text [default: Error]
 * @example errorToast(message, title)
 */
export const errorToast = (message?: string, title?: string) =>
  Toast.show({
    type: 'error',
    text1: title || t('error'),
    text2: message || t('something_went_wrong_please_try_again_later'),
    visibilityTime: TIME,
  });
