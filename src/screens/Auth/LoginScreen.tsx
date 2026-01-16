import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { loginSchema, validateForm } from '@validations/auth.validation';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import type { LoginScreenProps } from '../../types/navigation.types';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { t } = useTranslation();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    // validate form data
    const result = validateForm(loginSchema, { email, password });
    if (!result.success) {
      setErrors(result.errors || {});
      return;
    }

    // clear previous errors
    setErrors({});

    const loginResult = await login({ email, password });

    if (loginResult.success) {
      // navigation is handled by auth state change
      Alert.alert(t('common.sucess'), t('auth.login.success'));
    } else {
      Alert.alert(
        t('common.error'),
        loginResult.error || t('auth.login.error'),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex1}
    >
      <ScrollView
        contentContainerStyle={styles.flex1}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('auth.login.title')}</Text>
            <Text style={styles.subtitle}>{t('auth.login.subtitle')}</Text>
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorBoxText}>{error}</Text>
            </View>
          )}

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('auth.login.email')}</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroupLarge}>
            <Text style={styles.label}>{t('auth.login.password')}</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            disabled={isLoading}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              {t('auth.login.forgotPassword')}
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                {t('auth.login.signIn')}
              </Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>
              {t('auth.login.noAccount')}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
            >
              <Text style={styles.registerLink}>{t('auth.login.signUp')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  errorBoxText: {
    color: '#991b1b',
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  flex1: {
    flex: 1,
  },
  forgotPassword: {
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0284c7',
    fontSize: 14,
    textAlign: 'right',
  },
  header: {
    marginBottom: 32,
  },
  input: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupLarge: {
    marginBottom: 24,
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#0284c7',
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 16,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    color: '#0284c7',
    fontSize: 14,
    fontWeight: '600',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#4b5563',
    fontSize: 14,
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    color: '#4b5563',
    fontSize: 16,
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default LoginScreen;
