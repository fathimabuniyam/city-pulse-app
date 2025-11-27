import Colors from '@/constants/Colors.constants';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

const theme: ThemeProp = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    secondary: Colors.SECONDARY,
  },
};

interface Props {
  children: React.ReactNode;
}

export default function PaperThemeProvider({ children }: Props) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
