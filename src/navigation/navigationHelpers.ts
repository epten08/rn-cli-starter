import type { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';

import type { RootStackParamList } from '../types/navigation.types';

//Navigation reference for navigation outside of React components
export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

//Navigate to a screen programmatically
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationRef.current?.navigate(name as any, params as any);
}

//Go back to previous screen
export function goBack() {
  navigationRef.current?.goBack();
}

//Reset navigation stack
export function reset<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.reset({
    index: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routes: [{ name: name as any, params: params as any }],
  });
}

//Check if navigator is ready
export function isReady() {
  return navigationRef.current?.isReady();
}

//Get current route name
export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

//Navigate and reset to Auth stack
export function navigateToAuth() {
  reset('Auth');
}

// Navigate and reset to Main stack
export function navigateToMain() {
  reset('Main');
}
