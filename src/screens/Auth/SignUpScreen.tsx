import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Screen } from '@components/ui/Screen';
import { useAuth } from '@hooks/useAuth';
import { registerSchema, validateForm } from '@validations/auth.validation';
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import type { RegisterScreenProps } from '../../types/navigation.types';

const SignUpScreen = ({ navigation }: RegisterScreenProps) => {
  const { register, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignUp = async () => {
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      acceptTerms: true,
    };

    const result = validateForm(registerSchema, formData);
    if (!result.success) {
      setErrors(result.errors || {});
      return;
    }

    setErrors({});

    const registerResult = await register({
      email,
      password,
      firstName,
      lastName,
    });

    if (registerResult.success) {
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Error', registerResult.error || 'Registration failed');
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us and start your journey today
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
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={errors.firstName || errors.lastName}
            editable={!isLoading}
          />

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
            placeholder="Create a password"
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

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword}
            editable={!isLoading}
            rightIcon={
              <Text style={styles.showPasswordText}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Text>
            }
            onRightIconPress={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Create Account"
              onPress={handleSignUp}
              isLoading={isLoading}
              size="lg"
              style={styles.signUpButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
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
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  footerText: {
    color: '#6b7280', // gray-500
  },
  form: {
    width: '100%',
    maxWidth: 384, // max-w-sm
    alignSelf: 'center',
    gap: 16, // space-y-4
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 24,
  },
  logoContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#0ea5e9', // primary-500
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    // Shadow
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24, // 2xl
    fontWeight: '800',
  },
  showPasswordText: {
    color: '#0ea5e9', // primary-500
    fontWeight: '600',
    fontSize: 14,
  },
  signInLink: {
    paddingHorizontal: 8,
  },
  signInLinkText: {
    color: '#0ea5e9',
    fontWeight: '700',
  },
  signUpButton: {
    // Shadow
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24, // 2xl
    fontWeight: '700',
    color: '#111827', // gray-900
    marginBottom: 8,
  },
});

export default SignUpScreen;
