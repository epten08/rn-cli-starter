import ErrorBoundary from '@components/ErrorBoundary';
import { useOnboarding } from '@hooks/useOnboarding';
import { useAppSelector } from '@hooks/useRedux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '@screens/Onboarding';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import type { RootStackParamList } from '../types/navigation.types';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { navigationRef } from './navigationHelpers';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { isOnboardingComplete, isLoading, completeOnboarding } =
    useOnboarding();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <ErrorBoundary fallback={undefined}>
      <NavigationContainer ref={navigationRef}>
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
          ) : !isAuthenticated ? (
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
});
