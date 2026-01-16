import { initI18n } from '@i18n/index';
import { RootNavigator } from '@navigation/index';
import { persistor, store } from '@store/index';
import { Logger } from '@utils/logger';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        Logger.info('App: Initializing...');
        // initialise sentry here

        await initI18n();
        setIsI18nInitialized(true);

        Logger.info('App: initialized successfully');
      } catch (error) {
        Logger.error('App: Initialization failed', error);
        // Still set to true to show app with fallback language
        setIsI18nInitialized(true);
      }
    };
    initialize();

    return () => {
      Logger.info('App unmounting');
    };
  }, []);

  if (!isI18nInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <RootNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
