export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to React Native Starter',
    description:
      'Build amazing mobile apps with our production-ready starter template.',
    icon: 'rocket-outline',
    backgroundColor: '#0ea5e9',
  },
  {
    id: '2',
    title: 'Clean Architecture',
    description:
      'Follow best practices with services, repositories, and adapters pattern.',
    icon: 'construct-outline',
    backgroundColor: '#8b5cf6',
  },
  {
    id: '3',
    title: 'Type-Safe Development',
    description:
      'Full TypeScript support with Redux Toolkit and React Navigation.',
    icon: 'shield-checkmark-outline',
    backgroundColor: '#10b981',
  },
  {
    id: '4',
    title: 'Ready to Go',
    description:
      'Everything is configured. Just start building your amazing features!',
    icon: 'checkmark-circle-outline',
    backgroundColor: '#f59e0b',
  },
];
