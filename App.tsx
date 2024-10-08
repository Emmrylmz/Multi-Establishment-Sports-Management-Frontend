import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import DataFetcher from './src/app/components/utility/DataFetcher';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AppNavigator />
          {/* <StatusBar style="light" /> //this comes from expo */}
          <DataFetcher />
          {/* this comes from react-native */}
          {/* Both status bars are the same, couldn't decide on using one or the other */}
        </Provider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}