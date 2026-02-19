import { Button } from '@components/ui/Button';
import { Screen } from '@components/ui/Screen';
import { Skeleton } from '@components/ui/Skeleton';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { HomeScreenProps } from '../../types/navigation.types';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { user, isGuest, logout, isLoading } = useAuth();

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

  if (isLoading) {
    return (
      <Screen safeArea={false} statusBarStyle="light-content">
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.headerBackground}>
            <View style={styles.blob1} />
            <View style={styles.blob2} />
          </View>

          <View style={styles.headerContent}>
            <View style={styles.headerSkeletonBlock}>
              <Skeleton
                width={110}
                height={14}
                style={styles.skeletonSpacingSmall}
              />
              <Skeleton width={200} height={26} />
            </View>
            <Skeleton variant="circle" width={48} height={48} />
          </View>

          <View style={styles.mainContent}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Skeleton
                  width={72}
                  height={18}
                  style={styles.skeletonSpacingSmall}
                />
                <Skeleton width={54} height={12} />
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Skeleton
                  width={72}
                  height={18}
                  style={styles.skeletonSpacingSmall}
                />
                <Skeleton width={54} height={12} />
              </View>
            </View>

            <Skeleton
              width={140}
              height={22}
              style={styles.sectionTitleSkeleton}
            />
            <View style={styles.actionsGrid}>
              {[0, 1, 2, 3].map(index => (
                <View
                  key={`home-action-skeleton-${index}`}
                  style={styles.actionCard}
                >
                  <Skeleton
                    width={48}
                    height={48}
                    borderRadius={12}
                    style={styles.actionIconSkeleton}
                  />
                  <Skeleton width="66%" height={14} />
                </View>
              ))}
            </View>

            <View style={styles.promoCard}>
              <View style={styles.promoSkeletonContent}>
                <Skeleton
                  width={110}
                  height={20}
                  style={styles.skeletonSpacingSmall}
                />
                <Skeleton width={150} height={12} />
              </View>
              <Skeleton width={100} height={34} borderRadius={10} />
            </View>

            <View style={styles.logoutContainer}>
              <Skeleton width="100%" height={48} borderRadius={12} />
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen safeArea={false} statusBarStyle="light-content">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header Background */}
        <View style={styles.headerBackground}>
          <View style={styles.blob1} />
          <View style={styles.blob2} />
        </View>

        {/* Header Content */}
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>
              {isGuest ? 'Hello, Guest' : t('home.welcomeBack')}
            </Text>
            <Text style={styles.userText}>
              {isGuest ? 'Welcome to our app' : user?.fullName || user?.email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {})}
            style={styles.profileButton}
          >
            {isGuest ? (
              <Icon name="person-circle-outline" size={40} color="#ffffff" />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Quick Stats / Info */}
          {!isGuest && (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {user?.emailVerified ? 'Verified' : 'Unverified'}
                </Text>
                <Text style={styles.statLabel}>Status</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </Text>
                <Text style={styles.statLabel}>Joined</Text>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Profile', {})}
            >
              <View style={[styles.iconContainer, styles.blueIconBg]}>
                <Icon name="person" size={24} color="#0ea5e9" />
              </View>
              <Text style={styles.actionTitle}>{t('home.profile')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Settings')}
            >
              <View style={[styles.iconContainer, styles.purpleIconBg]}>
                <Icon name="settings" size={24} color="#a855f7" />
              </View>
              <Text style={styles.actionTitle}>{t('home.settings')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert('Explore', 'Coming soon!')}
            >
              <View style={[styles.iconContainer, styles.greenIconBg]}>
                <Icon name="compass" size={24} color="#10b981" />
              </View>
              <Text style={styles.actionTitle}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert('Support', 'Coming soon!')}
            >
              <View style={[styles.iconContainer, styles.orangeIconBg]}>
                <Icon name="help-circle" size={24} color="#f97316" />
              </View>
              <Text style={styles.actionTitle}>Support</Text>
            </TouchableOpacity>
          </View>

          {/* Promo / Banner Area */}
          <View style={styles.promoCard}>
            <View>
              <Text style={styles.promoTitle}>Go Premium</Text>
              <Text style={styles.promoDesc}>Unlock all features today.</Text>
            </View>
            <Button
              title="Upgrade"
              size="sm"
              variant="secondary"
              onPress={() =>
                Alert.alert('Upgrade', 'Premium features coming soon')
              }
              style={styles.upgradeButton}
            />
          </View>

          {/* Logout */}
          <View style={styles.logoutContainer}>
            <Button
              title={t('auth.logout.title')}
              variant="outline"
              leftIcon={
                <Icon name="log-out-outline" size={20} color="#ef4444" />
              }
              onPress={handleLogout}
              textStyle={styles.logoutButtonText}
              style={styles.logoutButton}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '47%', // approx half minus gap
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  actionTitle: {
    color: '#374151',
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  avatarText: {
    color: '#0ea5e9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  blob1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    backgroundColor: '#38bdf8', // primary-400
    borderRadius: 100,
    opacity: 0.5,
  },
  blob2: {
    position: 'absolute',
    bottom: -50,
    left: -20,
    width: 150,
    height: 150,
    backgroundColor: '#0284c7', // primary-600
    borderRadius: 75,
    opacity: 0.3,
  },
  blueIconBg: { backgroundColor: '#e0f2fe' },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  greenIconBg: { backgroundColor: '#d1fae5' },
  headerSkeletonBlock: {
    gap: 8,
  },
  greetingText: {
    color: '#bae6fd', // primary-200
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerBackground: {
    backgroundColor: '#0ea5e9', // primary-500
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  headerContent: {
    paddingTop: 60, // status bar space
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    width: 48,
  },
  logoutContainer: {
    marginBottom: 40,
  },
  logoutButton: {
    borderColor: '#fee2e2',
  },
  logoutButtonText: {
    color: '#ef4444',
  },
  mainContent: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  orangeIconBg: { backgroundColor: '#ffedd5' },
  profileButton: {
    padding: 4,
  },
  promoCard: {
    backgroundColor: '#1f2937', // gray-800
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  promoDesc: {
    color: '#9ca3af',
    fontSize: 12,
  },
  promoTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  purpleIconBg: { backgroundColor: '#f3e8ff' },
  sectionTitleSkeleton: {
    marginBottom: 16,
  },
  promoSkeletonContent: {
    flex: 1,
    marginRight: 16,
  },
  actionIconSkeleton: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  statDivider: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
    width: 1,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  statValue: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 5,
    flexDirection: 'row',
    marginBottom: 32,
    padding: 20,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  upgradeButton: {
    minWidth: 100,
  },
  skeletonSpacingSmall: {
    marginBottom: 6,
  },
  userText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },
});

export default HomeScreen;
