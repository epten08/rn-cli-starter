import { Screen } from '@components/ui/Screen';
import { Skeleton } from '@components/ui/Skeleton';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useToast } from '@hooks/useToast';
import { setTheme, setLanguage } from '@store/slices/app.slice';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type ThemeOption = 'light' | 'dark' | 'system';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  right?: React.ReactNode;
}

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  right,
}: SettingItemProps) => {
  const content = (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Icon name={icon} size={22} color="#0ea5e9" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {right ||
        (onPress && <Icon name="chevron-forward" size={20} color="#9ca3af" />)}
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

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection = ({ title, children }: SettingSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const renderSettingsSkeletonRows = (count: number) =>
  Array.from({ length: count }).map((_, index) => (
    <View key={`settings-skeleton-row-${index}`} style={styles.settingItem}>
      <Skeleton
        width={36}
        height={36}
        borderRadius={8}
        style={styles.settingIcon}
      />
      <View style={styles.settingContent}>
        <Skeleton width="48%" height={15} style={styles.settingSkeletonTitle} />
        <Skeleton width="62%" height={12} />
      </View>
    </View>
  ));

const SettingsScreen = () => {
  const { t, i18n, ready } = useTranslation();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const theme = useAppSelector(state => state.app.theme);
  const language = useAppSelector(state => state.app.language);

  const isDarkMode = theme === 'dark';

  const handleThemeToggle = () => {
    const newTheme: ThemeOption = isDarkMode ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    showToast({
      type: 'success',
      title: 'Theme Updated',
      message: `Switched to ${newTheme} mode`,
    });
  };

  const handleLanguageChange = () => {
    const languages = ['en', 'es', 'fr'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLang = languages[nextIndex];

    i18n.changeLanguage(newLang);
    dispatch(setLanguage(newLang));

    const langNames: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
    };

    showToast({
      type: 'success',
      title: t('common.language'),
      message: `Changed to ${langNames[newLang]}`,
    });
  };

  const getLanguageName = () => {
    const langNames: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
    };
    return langNames[language] || 'English';
  };

  if (!ready) {
    return (
      <Screen>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Skeleton
              width={90}
              height={12}
              style={styles.sectionHeaderSkeleton}
            />
            <View style={styles.sectionContent}>
              {renderSettingsSkeletonRows(2)}
            </View>
          </View>

          <View style={styles.section}>
            <Skeleton
              width={110}
              height={12}
              style={styles.sectionHeaderSkeleton}
            />
            <View style={styles.sectionContent}>
              {renderSettingsSkeletonRows(1)}
            </View>
          </View>

          <View style={styles.section}>
            <Skeleton
              width={130}
              height={12}
              style={styles.sectionHeaderSkeleton}
            />
            <View style={styles.sectionContent}>
              {renderSettingsSkeletonRows(2)}
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SettingSection title="Appearance">
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle={isDarkMode ? 'On' : 'Off'}
            right={
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{ false: '#e5e7eb', true: '#0ea5e9' }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle={getLanguageName()}
            onPress={handleLanguageChange}
          />
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Manage notification preferences"
            onPress={() => {
              showToast({
                type: 'info',
                title: 'Coming Soon',
                message: 'Notification settings will be available soon',
              });
            }}
          />
        </SettingSection>

        <SettingSection title="Privacy & Security">
          <SettingItem
            icon="lock-closed-outline"
            title="Privacy Policy"
            onPress={() => {
              showToast({
                type: 'info',
                title: 'Coming Soon',
                message: 'Privacy policy will be available soon',
              });
            }}
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => {
              showToast({
                type: 'info',
                title: 'Coming Soon',
                message: 'Terms of service will be available soon',
              });
            }}
          />
        </SettingSection>

        <SettingSection title="About">
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0"
          />
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => {
              showToast({
                type: 'info',
                title: 'Coming Soon',
                message: 'Help center will be available soon',
              });
            }}
          />
        </SettingSection>

        <View style={styles.footer}>
          <Text style={styles.footerText}>React Native Starter</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  section: {
    marginTop: 24,
  },
  sectionHeaderSkeleton: {
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  settingContent: {
    flex: 1,
  },
  settingIcon: {
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    marginRight: 12,
    width: 36,
  },
  settingItem: {
    alignItems: 'center',
    borderBottomColor: '#f3f4f6',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingSubtitle: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 2,
  },
  settingTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '500',
  },
  settingSkeletonTitle: {
    marginBottom: 8,
  },
});

export default SettingsScreen;
