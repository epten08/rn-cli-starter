import React from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const getVariantStyle = (variant: ButtonVariant): ViewStyle => {
  switch (variant) {
    case 'ghost':
      return { backgroundColor: 'transparent' };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: '#0ea5e9',
        borderWidth: 1,
      };
    case 'primary':
      return { backgroundColor: '#0ea5e9' };
    case 'secondary':
      return { backgroundColor: '#6b7280' };
  }
};

const getSizeStyle = (size: ButtonSize): ViewStyle => {
  switch (size) {
    case 'lg':
      return { paddingHorizontal: 24, paddingVertical: 16 };
    case 'md':
      return { paddingHorizontal: 16, paddingVertical: 12 };
    case 'sm':
      return { paddingHorizontal: 12, paddingVertical: 8 };
  }
};

const getTextVariantStyle = (variant: ButtonVariant): TextStyle => {
  switch (variant) {
    case 'ghost':
    case 'outline':
      return { color: '#0ea5e9' };
    case 'primary':
    case 'secondary':
      return { color: '#ffffff' };
  }
};

const getTextSizeStyle = (size: ButtonSize): TextStyle => {
  switch (size) {
    case 'lg':
      return { fontSize: 18 };
    case 'md':
      return { fontSize: 16 };
    case 'sm':
      return { fontSize: 14 };
  }
};

export const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.base,
        getVariantStyle(variant),
        getSizeStyle(size),
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost' ? '#0ea5e9' : '#ffffff'
          }
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              styles.textBase,
              getTextVariantStyle(variant),
              getTextSizeStyle(size),
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: 8,
  },
  loadingIndicator: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  textBase: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
