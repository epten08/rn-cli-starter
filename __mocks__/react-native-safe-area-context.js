import { createContext } from 'react';

const inset = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const frame = {
  x: 0,
  y: 0,
  width: 390,
  height: 844,
};

export const SafeAreaProvider = ({ children }) => children;
export const SafeAreaConsumer = ({ children }) => children({ inset });
export const SafeAreaView = ({ children }) => children;
export const useSafeAreaInsets = () => inset;
export const useSafeAreaFrame = () => frame;
export const SafeAreaFrameContext = createContext(frame);
export const SafeAreaInsetsContext = createContext(inset);
export const initialWindowMetrics = {
  insets: inset,
  frame: frame,
};
export const SafeAreaProviderCompat = ({ children }) => children;
export const withSafeAreaInsets = Component => Component;
