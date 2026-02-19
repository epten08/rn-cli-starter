import { NetworkStatusBar } from '@components/ui/NetworkStatusBar';
import { Skeleton } from '@components/ui/Skeleton';
import { ToastProvider } from '@components/ui/Toast';
import { initI18n } from '@i18n/index';
import { RootNavigator } from '@navigation/index';
import { persistor, store } from '@store/index';
import { Logger } from '@utils/logger';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
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
        <View style={styles.loadingCard}>
          <Skeleton
            width={64}
            height={64}
            borderRadius={16}
            style={styles.loadingLogo}
          />
          <Skeleton width="70%" height={24} style={styles.loadingTitle} />
          <Skeleton width="45%" height={14} />
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ToastProvider>
              <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
              <NetworkStatusBar />
              <RootNavigator />
            </ToastProvider>
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
  loadingCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    minWidth: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  loadingLogo: {
    marginBottom: 18,
  },
  loadingTitle: {
    marginBottom: 12,
  },
});

export default App;
