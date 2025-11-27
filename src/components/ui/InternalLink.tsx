import { useRouter } from 'expo-router';
import { RouteProps } from 'expo-router/build/Route';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text, { TextProps } from './Text';

interface Props extends TextProps {
  link?: RouteProps['route'] | string;
  shouldReplace?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  children: React.ReactNode;
  containerStyles?: TouchableOpacityProps['style'];
}

const InternalLink = ({
  link,
  onPress,
  shouldReplace,

  color,
  weight,
  size,
  children,
  containerStyles,
  ...props
}: Props) => {
  const { replace, navigate } = useRouter();

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={
        onPress
          ? onPress
          : () => (shouldReplace ? replace(link as any) : navigate(link as any))
      }
    >
      <Text color={color} weight={weight} size={size} {...props}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default InternalLink;
