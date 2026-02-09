export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'WELCOME TO SYNC!',
    description: 'Your journey to organized living starts here.',
    icon: 'apps-outline',
  },
  {
    id: '2',
    title: 'STAY ORGANIZED',
    description: 'Manage tasks, set reminders, and conquer your day.',
    icon: 'alarm-outline',
  },
  {
    id: '3',
    title: 'CONNECT & SHARE',
    description: 'Collaborate with friends and family effortlessly.',
    icon: 'people-outline',
  },
];

// Sync Theme Colors
export const SYNC_COLORS = {
  primaryBlue: '#3B82F6',
  softLavender: '#E0E7FF',
  white: '#FFFFFF',
  textDark: '#1E293B',
  textMuted: '#64748B',
};
