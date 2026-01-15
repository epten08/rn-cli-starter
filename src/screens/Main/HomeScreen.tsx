import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { HomeScreenProps } from '../../types/navigation.types';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          const result = await logout();
          if (result.success) {
            // Navigation handled by RootNavigator
          }
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-600 pt-12 pb-6 px-6">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-2xl font-bold">
              {t('home.welcomeBack')}
            </Text>
            <Text className="text-primary-100 text-sm mt-1">
              {user?.fullName || user?.email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {})}
            className="bg-white/20 rounded-full p-2"
          >
            <Icon name="person-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="px-6 py-6">
        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            {t('home.quickActions')}
          </Text>
          <View className="flex-row flex-wrap gap-4">
            <TouchableOpacity className="bg-white rounded-xl p-4 flex-1 min-w-[150px] shadow-sm">
              <View className="bg-primary-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Icon name="person-outline" size={24} color="#0ea5e9" />
              </View>
              <Text className="text-gray-900 font-semibold mb-1">
                {t('home.profile')}
              </Text>
              <Text className="text-gray-500 text-xs">
                {t('home.profileDesc')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              className="bg-white rounded-xl p-4 flex-1 min-w-[150px] shadow-sm"
            >
              <View className="bg-purple-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Icon name="settings-outline" size={24} color="#a855f7" />
              </View>
              <Text className="text-gray-900 font-semibold mb-1">
                {t('home.settings')}
              </Text>
              <Text className="text-gray-500 text-xs">
                {t('home.settingsDesc')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            {t('home.stats')}
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Icon name="checkmark-circle" size={20} color="#10b981" />
                </View>
                <View>
                  <Text className="text-gray-900 font-semibold">
                    {t('home.emailVerified')}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {user?.emailVerified
                      ? t('home.verified')
                      : t('home.notVerified')}
                  </Text>
                </View>
              </View>
              <Icon
                name={user?.emailVerified ? 'checkmark-circle' : 'close-circle'}
                size={24}
                color={user?.emailVerified ? '#10b981' : '#ef4444'}
              />
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Icon name="calendar-outline" size={20} color="#3b82f6" />
                </View>
                <View>
                  <Text className="text-gray-900 font-semibold">
                    {t('home.memberSince')}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex-row items-center justify-center"
        >
          <Icon name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-600 font-semibold ml-2">
            {t('auth.logout.title')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
