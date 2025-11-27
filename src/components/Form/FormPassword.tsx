import Colors from '@/constants/Colors.constants';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import FormInput, { FormInputProps } from './FormInput';

interface Props extends FormInputProps {}

const FormPassword: React.FC<Props> = ({
  name,
  label,
  icon,
  placeholder,
  keyboardType,

  rightNode,
  containerStyles,
  inputStyles,
  ...props
}) => {
  const [secure, setSecure] = useState(true);

  const togglePasswordVisibility = () => {
    setSecure(!secure);
  };

  return (
    <FormInput
      name={name}
      label={label}
      icon={icon}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secure}
      containerStyles={containerStyles}
      inputStyles={inputStyles}
      rightNode={
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {secure ? (
            <MaterialDesignIcons
              name="eye-off"
              size={20}
              color={Colors.TEXT_SECONDARY}
            />
          ) : (
            <MaterialDesignIcons
              name="eye"
              size={20}
              color={Colors.TEXT_SECONDARY}
            />
          )}
        </TouchableOpacity>
      }
      {...props}
    />
  );
};

export default FormPassword;
