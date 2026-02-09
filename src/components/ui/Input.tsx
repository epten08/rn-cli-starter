import React from 'react';
import type { TextInputProps, StyleProp, ViewStyle } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onRightIconPress?: () => void;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  onRightIconPress,
  style,
  ...props
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : styles.inputDefault,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#9ca3af"
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#ef4444', // red-500
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827', // gray-900
    paddingVertical: 0, // Remove default padding to stick to container padding
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#f9fafb', // gray-50
    paddingHorizontal: 16,
    paddingVertical: 12, // Adjusted for cleaner height
  },
  inputDefault: {
    borderColor: '#e5e7eb', // gray-200
  },
  inputError: {
    borderColor: '#ef4444', // red-500
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8, // gray-700
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
});
