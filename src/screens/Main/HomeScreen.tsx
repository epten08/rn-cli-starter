import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>{t('home.welcomeBack')}</Text>
            <Text style={styles.userText}>{user?.fullName || user?.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {})}
            style={styles.profileButton}
          >
            <Icon name="person-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.iconCircle, styles.primaryIconBg]}>
                <Icon name="person-outline" size={24} color="#0ea5e9" />
              </View>
              <Text style={styles.actionTitle}>{t('home.profile')}</Text>
              <Text style={styles.actionDesc}>{t('home.profileDesc')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.actionCard}
            >
              <View style={[styles.iconCircle, styles.purpleIconBg]}>
                <Icon name="settings-outline" size={24} color="#a855f7" />
              </View>
              <Text style={styles.actionTitle}>{t('home.settings')}</Text>
              <Text style={styles.actionDesc}>{t('home.settingsDesc')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.stats')}</Text>
          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <View style={styles.statLeft}>
                <View style={[styles.statIconCircle, styles.greenIconBg]}>
                  <Icon name="checkmark-circle" size={20} color="#10b981" />
                </View>
                <View>
                  <Text style={styles.statTitle}>
                    {t('home.emailVerified')}
                  </Text>
                  <Text style={styles.statSubtitle}>
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

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <View style={styles.statLeft}>
                <View style={[styles.statIconCircle, styles.blueIconBg]}>
                  <Icon name="calendar-outline" size={20} color="#3b82f6" />
                </View>
                <View>
                  <Text style={styles.statTitle}>{t('home.memberSince')}</Text>
                  <Text style={styles.statSubtitle}>
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
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>{t('auth.logout.title')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 1,
    flex: 1,
    minWidth: 150,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionDesc: {
    color: '#6b7280',
    fontSize: 12,
  },
  actionTitle: {
    color: '#111827',
    fontWeight: '600',
    marginBottom: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  blueIconBg: {
    backgroundColor: '#dbeafe',
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  greenIconBg: {
    backgroundColor: '#d1fae5',
  },
  header: {
    backgroundColor: '#0284c7',
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    width: 48,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '600',
    marginLeft: 8,
  },
  primaryIconBg: {
    backgroundColor: '#e0f2fe',
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  purpleIconBg: {
    backgroundColor: '#f3e8ff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 1,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statIconCircle: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  statLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statSubtitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  statTitle: {
    color: '#111827',
    fontWeight: '600',
  },
  userText: {
    color: '#bae6fd',
    fontSize: 14,
    marginTop: 4,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
