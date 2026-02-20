import type { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from '../types/navigation.types';

export const DEEP_LINK_SCHEME = 'reactnativestarter';
export const DEEP_LINK_DOMAIN = 'reactnativestarter.app';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    `${DEEP_LINK_SCHEME}://`,
    `https://${DEEP_LINK_DOMAIN}`,
    `http://${DEEP_LINK_DOMAIN}`,
  ],
  config: {
    screens: {
      Onboarding: 'onboarding',
      Auth: {
        path: '',
        screens: {
          Login: 'login',
          Register: 'register',
          ForgotPassword: 'forgot-password',
        },
      },
      Main: {
        path: '',
        screens: {
          MainTabs: {
            path: '',
            screens: {
              Home: '',
              Explore: 'explore',
              Notifications: 'notifications',
              Account: 'account',
            },
          },
          Settings: 'settings',
          EditProfile: 'profile/edit',
          Profile: 'profile/:userId?',
        },
      },
    },
  },
};
