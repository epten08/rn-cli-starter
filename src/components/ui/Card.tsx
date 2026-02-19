import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const getPaddingStyle = (padding: CardProps['padding']): ViewStyle => {
  switch (padding) {
    case 'none':
      return { padding: 0 };
    case 'sm':
      return { padding: 8 };
    case 'lg':
      return { padding: 24 };
    case 'md':
    default:
      return { padding: 16 };
  }
};

const getVariantStyle = (variant: CardProps['variant']): ViewStyle => {
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        elevation: 0,
        shadowOpacity: 0,
      };
    case 'filled':
      return {
        backgroundColor: '#f9fafb',
        elevation: 0,
        shadowOpacity: 0,
      };
    case 'elevated':
    default:
      return {
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      };
  }
};

export const Card = ({
  children,
  style,
  onPress,
  variant = 'elevated',
  padding = 'md',
}: CardProps) => {
  const content = (
    <View
      style={[
        styles.container,
        getVariantStyle(variant),
        getPaddingStyle(padding),
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export const CardHeader = ({
  title,
  subtitle,
  right,
  style,
}: CardHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {right && <View style={styles.headerRight}>{right}</View>}
    </View>
  );
};

export const CardContent = ({ children, style }: CardContentProps) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

export const CardFooter = ({ children, style }: CardFooterProps) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    marginTop: 12,
  },
  footer: {
    borderTopColor: '#f3f4f6',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingTop: 12,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRight: {
    marginLeft: 12,
  },
  headerText: {
    flex: 1,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
});
