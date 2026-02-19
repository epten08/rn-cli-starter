import { Screen } from '@components/ui/Screen';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type PlaceholderRouteName = 'Explore' | 'Account' | 'Profile' | 'EditProfile';

interface PlaceholderScreenProps {
  route: {
    name: string;
  };
}

interface PlaceholderContent {
  title: string;
  subtitle: string;
  icon: string;
  checklist: string[];
}

const PLACEHOLDER_CONTENT: Record<PlaceholderRouteName, PlaceholderContent> = {
  Explore: {
    title: 'Explore',
    subtitle:
      'Discover collections, trends, and recommendations tailored to you.',
    icon: 'compass-outline',
    checklist: [
      'Curated discovery feed',
      'Search and filter controls',
      'Saved topics and quick follow',
    ],
  },
  Account: {
    title: 'Account',
    subtitle: 'Manage your personal preferences and account-level settings.',
    icon: 'person-outline',
    checklist: [
      'Profile summary and account insights',
      'Connected sessions and security controls',
      'Personalization preferences',
    ],
  },
  Profile: {
    title: 'Profile',
    subtitle: 'View your public profile details and progress at a glance.',
    icon: 'id-card-outline',
    checklist: [
      'Extended profile details',
      'Activity overview',
      'Quick actions and shortcuts',
    ],
  },
  EditProfile: {
    title: 'Edit Profile',
    subtitle: 'Update your profile information and keep your details current.',
    icon: 'create-outline',
    checklist: [
      'Editable personal information',
      'Avatar and contact updates',
      'Validation and change tracking',
    ],
  },
};

const DEFAULT_CONTENT: PlaceholderContent = {
  title: 'Coming Soon',
  subtitle:
    'This area is in progress and will be available in an upcoming update.',
  icon: 'sparkles-outline',
  checklist: [
    'UI flow implementation',
    'Data integration',
    'QA and release readiness',
  ],
};

const PlaceholderScreen = ({ route }: PlaceholderScreenProps) => {
  const routeName = route.name as PlaceholderRouteName;
  const content = PLACEHOLDER_CONTENT[routeName] || DEFAULT_CONTENT;

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
          <View style={styles.iconContainer}>
            <Icon name={content.icon} size={28} color="#0ea5e9" />
          </View>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.subtitle}>{content.subtitle}</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Planned In This Area</Text>
            {content.checklist.map(item => (
              <View key={item} style={styles.checklistItem}>
                <View style={styles.checklistDot} />
                <Text style={styles.checklistText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.noteCard}>
            <Icon name="time-outline" size={20} color="#0369a1" />
            <Text style={styles.noteText}>
              This screen is intentionally a placeholder while core flows are
              being completed.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  blob1: {
    backgroundColor: '#38bdf8',
    borderRadius: 90,
    height: 180,
    opacity: 0.5,
    position: 'absolute',
    right: -70,
    top: -60,
    width: 180,
  },
  blob2: {
    backgroundColor: '#0284c7',
    borderRadius: 75,
    bottom: -50,
    height: 150,
    left: -30,
    opacity: 0.3,
    position: 'absolute',
    width: 150,
  },
  checklistDot: {
    backgroundColor: '#0ea5e9',
    borderRadius: 3,
    height: 6,
    marginRight: 10,
    marginTop: 7,
    width: 6,
  },
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checklistText: {
    color: '#4b5563',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerBackground: {
    backgroundColor: '#0ea5e9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 220,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 72,
    zIndex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    marginBottom: 18,
    width: 56,
  },
  mainContent: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  noteCard: {
    alignItems: 'flex-start',
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
  },
  noteText: {
    color: '#0c4a6e',
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 10,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    color: '#e0f2fe',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 330,
    textAlign: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
});

export default PlaceholderScreen;
