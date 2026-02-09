import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Screen } from '@components/ui/Screen';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { loginSchema, validateForm } from '@validations/auth.validation';
import React, { useState } from 'react';
import { View, Text, Alert, Image, StyleSheet } from 'react-native';

import type { LoginScreenProps } from '../../types/navigation.types';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { t } = useTranslation();
  const { login, loginAsGuest, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    const result = validateForm(loginSchema, { email, password });
    if (!result.success) {
      setErrors(result.errors || {});
      return;
    }

    setErrors({});

    const loginResult = await login({ email, password });

    if (loginResult.success) {
      // Success is handled by state change in App (isAuthenticated -> true)
    } else {
      Alert.alert(
        t('common.error'),
        loginResult.error || t('auth.login.error'),
      );
    }
  };

  return (
    <Screen scrollable safeArea={true}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to your workspace
          </Text>
        </View>

        {/* Form Section */}
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
            editable={!isLoading}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={errors.password}
            editable={!isLoading}
            rightIcon={
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <View style={styles.forgotPasswordContainer}>
            <Button
              title="Forgot Password?"
              variant="ghost"
              size="sm"
              style={styles.noPadding}
              textStyle={styles.forgotPasswordText}
              onPress={() =>
                Alert.alert(
                  'Coming Soon',
                  'Forgot Password flow not implemented yet.',
                )
              }
            />
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            isLoading={isLoading}
            size="lg"
            style={styles.signInButton}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <Button
              title="Google"
              variant="outline"
              style={styles.flex1}
              leftIcon={
                <Image
                  source={{ uri: 'https://www.google.com/favicon.ico' }}
                  style={styles.socialIcon}
                />
              }
              onPress={() => Alert.alert('Coming Soon', 'Google Sign In')}
            />
            <Button
              title="Apple"
              variant="outline"
              style={styles.flex1}
              leftIcon={<Text style={styles.appleIcon}></Text>}
              onPress={() => Alert.alert('Coming Soon', 'Apple Sign In')}
            />
          </View>

          <Button
            title="Continue as Guest"
            variant="secondary"
            onPress={loginAsGuest}
            style={styles.guestButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <Button
              title="Sign Up"
              variant="ghost"
              style={styles.signUpLink}
              textStyle={styles.signUpLinkText}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  appleIcon: {
    fontSize: 20,
    marginTop: -4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dividerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  dividerLine: {
    backgroundColor: '#e5e7eb',
    flex: 1,
    height: 1, // gray-200
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9ca3af', // gray-400
    fontSize: 14,
  },
  errorBanner: {
    backgroundColor: '#fef2f2', // red-50
    borderColor: '#fee2e2', // red-100
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorBannerText: {
    color: '#b91c1c', // red-700
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  flex1: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  footerText: {
    color: '#6b7280', // gray-500
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0ea5e9',
  },
  form: {
    width: '100%',
    maxWidth: 384, // max-w-sm (approx)
    alignSelf: 'center',
    gap: 16, // space-y-4 alternative
  },
  guestButton: {
    marginBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#0ea5e9', // primary-500
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    // Shadow
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 30, // 3xl
    fontWeight: '800',
  },
  noPadding: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  showPasswordText: {
    color: '#0ea5e9', // primary-500
    fontWeight: '600',
    fontSize: 14,
  },
  signInButton: {
    marginBottom: 24,
    // Shadow
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  signUpLink: {
    paddingHorizontal: 8,
  },
  signUpLinkText: {
    color: '#0ea5e9',
    fontWeight: '700',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  socialIcon: {
    height: 20,
    width: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    textAlign: 'center',
  },
  title: {
    fontSize: 30, // 3xl
    fontWeight: '700',
    color: '#111827', // gray-900
    marginBottom: 8,
  },
});

export default LoginScreen;
