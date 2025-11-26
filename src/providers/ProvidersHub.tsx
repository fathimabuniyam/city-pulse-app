import { persistor, store } from '@/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LocaleProvider from './LocaleProvider';

interface Props {
  children: ReactNode;
}

function ProvidersHub({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocaleProvider>{children}</LocaleProvider>
      </PersistGate>
    </Provider>
  );
}

export default ProvidersHub;
