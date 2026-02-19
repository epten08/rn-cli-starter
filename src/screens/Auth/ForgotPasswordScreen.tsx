import { AuthScreenSkeleton } from '@components/common/AuthScreenSkeleton';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Screen } from '@components/ui/Screen';
import { useAuth } from '@hooks/useAuth';
import {
  forgotPasswordSchema,
  validateForm,
} from '@validations/auth.validation';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import type { ForgotPasswordScreenProps } from '../../types/navigation.types';

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { forgotPassword, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isScreenLoading = isLoading || isSubmitting;

  const handleForgotPassword = async () => {
    const result = validateForm(forgotPasswordSchema, { email });
    if (!result.success) {
      setErrors(result.errors || {});
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const forgotPasswordResult = await forgotPassword(email);

      if (forgotPasswordResult.success) {
        Alert.alert(
          'Check your email',
          forgotPasswordResult.message ||
            'If an account exists for this email, you will receive reset instructions shortly.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
        );
      } else {
        Alert.alert(
          'Error',
          forgotPasswordResult.error || 'Failed to send reset link',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isScreenLoading) {
    return (
      <Screen scrollable safeArea={true}>
        <AuthScreenSkeleton fieldCount={1} compactHeader={true} />
      </Screen>
    );
  }

  return (
    <Screen scrollable safeArea={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we&apos;ll send you a reset link
          </Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          )}

          <Input
            label="Email Address"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
            editable={!isScreenLoading}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Send Reset Link"
              onPress={handleForgotPassword}
              isLoading={isScreenLoading}
              size="lg"
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remember your password? </Text>
            <Button
              title="Sign In"
              variant="ghost"
              style={styles.signInLink}
              textStyle={styles.signInLinkText}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorBanner: {
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderColor: '#fee2e2',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  errorBannerText: {
    color: '#b91c1c',
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  footerText: {
    color: '#6b7280',
  },
  form: {
    alignSelf: 'center',
    gap: 16,
    maxWidth: 384,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 24,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    borderRadius: 16,
    elevation: 10,
    height: 56,
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: 56,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },
  signInLink: {
    paddingHorizontal: 8,
  },
  signInLinkText: {
    color: '#0ea5e9',
    fontWeight: '700',
  },
  submitButton: {
    elevation: 5,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
});

export default ForgotPasswordScreen;
