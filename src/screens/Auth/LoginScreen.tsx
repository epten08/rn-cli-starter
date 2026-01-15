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
      className="flex-1"
    >
      <ScrollView contentContainerClassName="flex-1" className="bg-white">
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              {t('auth.login.title')}
            </Text>
            <Text className="text-base text-gray-600">
              {t('auth.login.subtitle')}
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <Text className="text-red-800 text-sm">{error}</Text>
            </View>
          )}

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              {t('auth.login.email')}
            </Text>
            <TextInput
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-base`}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              {t('auth.login.password')}
            </Text>
            <TextInput
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-base`}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.password}
              </Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            disabled={isLoading}
            className="mb-6"
          >
            <Text className="text-primary-600 text-sm text-right">
              {t('auth.login.forgotPassword')}
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="bg-primary-600 rounded-lg py-4 items-center mb-4"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-semibold">
                {t('auth.login.signIn')}
              </Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600 text-sm">
              {t('auth.login.noAccount')}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
            >
              <Text className="text-primary-600 text-sm font-semibold">
                {t('auth.login.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
