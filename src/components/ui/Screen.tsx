import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarColor?: string;
  safeArea?: boolean;
}

export const Screen = ({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  statusBarStyle = 'dark-content',
  statusBarColor = 'transparent',
  safeArea = true,
}: ScreenProps) => {
  const Wrapper = safeArea ? SafeAreaView : View;

  const content = scrollable ? (
    <ScrollView
      style={styles.flex1}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex1, contentContainerStyle]}>{children}</View>
  );

  return (
    <Wrapper style={[styles.container, style]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor}
        translucent={Platform.OS === 'android'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex1}
      >
        {content}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
});
