import ErrorBoundary from '@components/ErrorBoundary';
import { Skeleton } from '@components/ui/Skeleton';
import { useOnboarding } from '@hooks/useOnboarding';
import { useAppSelector } from '@hooks/useRedux';
import { useRemoteNotifications } from '@hooks/useRemoteNotifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '@screens/Onboarding';
import { setSentryUser } from '@services/sentry.service';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import type { RootStackParamList } from '../types/navigation.types';

import AuthNavigator from './AuthNavigator';
import { linking } from './linking';
import MainNavigator from './MainNavigator';
import { navigationRef } from './navigationHelpers';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, isGuest, user } = useAppSelector(
    state => state.auth,
  );
  const { isOnboardingComplete, isLoading, completeOnboarding } =
    useOnboarding();
  useRemoteNotifications();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setSentryUser({ id: user.id, email: user.email });
      return;
    }

    setSentryUser(null);
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Skeleton width="62%" height={24} style={styles.loadingTitle} />
          <Skeleton width="78%" height={14} style={styles.loadingLine} />
          <Skeleton width="70%" height={14} />
        </View>
      </View>
    );
  }

  return (
    <ErrorBoundary fallback={undefined}>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          {!isOnboardingComplete ? (
            <Stack.Screen name="Onboarding">
              {() => <OnboardingScreen onComplete={completeOnboarding} />}
            </Stack.Screen>
          ) : !isAuthenticated && !isGuest ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="Main" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    width: '100%',
  },
  loadingLine: {
    marginBottom: 10,
  },
  loadingTitle: {
    marginBottom: 14,
  },
});
