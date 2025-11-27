import Colors from '@/constants/Colors.constants';
import { alpha } from '@/utils/Colors.util';
import { fontFamilyCss } from '@/utils/Font.util';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import { getIn, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Text from '../ui/Text';

export interface FormInputProps
  extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  label?: string;
  name: string;
  icon?: MaterialDesignIconsIconName;
  inputStyles?: TextInputProps['style'];
  wrapperStyles?: ViewStyle;
  containerStyles?: ViewStyle;
  rightNode?: ReactNode;
  formatInput?: (value: string) => string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  icon,
  placeholder,
  rightNode,
  wrapperStyles,
  containerStyles,
  inputStyles,
  formatInput,
  ...props
}) => {
  const { values, handleChange, handleBlur, setFieldValue, errors, touched } =
    useFormikContext<any>();

  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  const hasError = fieldTouched && fieldError;

  const onChangeText = (text: string) => {
    if (formatInput) setFieldValue(name, formatInput(text));
  };

  return (
    <View style={[styles.wrapper, wrapperStyles]}>
      <View
        style={[
          styles.container,
          {
            borderColor: hasError
              ? Colors.RED
              : alpha(Colors.BORDER_GRAY, 0.92),
            backgroundColor:
              props.editable === false ? Colors.BACKGROUND : 'inherit',
          },
          containerStyles,
        ]}
      >
        {label && (
          <Text color={Colors.TEXT_SECONDARY} size={14} weight={400}>
            {label}
          </Text>
        )}

        <View style={styles.inputContainer}>
          {icon && (
            <MaterialDesignIcons
              name={icon}
              size={20}
              color={Colors.TEXT_SECONDARY}
              style={styles.icon}
            />
          )}

          <TextInput
            style={[styles.input, fontFamilyCss(400), inputStyles]}
            value={fieldValue}
            onChangeText={formatInput ? onChangeText : handleChange(name)}
            onBlur={handleBlur(name)}
            placeholder={placeholder}
            {...props}
          />

          {rightNode}
        </View>
      </View>
      {hasError && (
        <Text color={Colors.RED} size={13} style={styles.errorText}>
          {fieldError}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 7,
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.WHITE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    color: Colors.TEXT_PRIMARY,
    fontSize: 15,
    padding: 0,
    flex: 1,
  },
  errorText: {
    marginTop: 5,
    marginLeft: 5,
  },
});

export default FormInput;
