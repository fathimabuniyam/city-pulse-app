import { ReactNode } from 'react';
import LocaleProvider from './LocaleProvider';
import PaperThemeProvider from './PaperThemeProvider';
import QueryProvider from './QueryProvider';

interface Props {
  children: ReactNode;
}

function ProvidersHub({ children }: Props) {
  return (
    <LocaleProvider>
      <PaperThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </PaperThemeProvider>
    </LocaleProvider>
  );
}

export default ProvidersHub;
