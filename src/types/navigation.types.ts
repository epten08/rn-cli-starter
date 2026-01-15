import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Root Stack Navigator Params
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
};

// Auth Stack Navigator Params
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

// Main Stack Navigator Params
export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Profile: { userId?: string };
  Settings: undefined;
  EditProfile: undefined;
};

// Bottom Tabs Navigator Params
export type MainTabsParamList = {
  Home: undefined;
  Explore: undefined;
  Notifications: undefined;
  Account: undefined;
};

// Auth Screen Navigation Props
export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;
export type LoginScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;
export type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Register'>;

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;
export type ForgotPasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'ForgotPassword'
>;

export type ResetPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ResetPassword'
>;
export type ResetPasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'ResetPassword'
>;

/**
 * Main Screen Navigation Props (with composite navigation)
 */
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Home'>,
  StackNavigationProp<MainStackParamList>
>;
export type HomeScreenRouteProp = RouteProp<MainTabsParamList, 'Home'>;

export type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Explore'>,
  StackNavigationProp<MainStackParamList>
>;
export type ExploreScreenRouteProp = RouteProp<MainTabsParamList, 'Explore'>;

export type NotificationsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Notifications'>,
  StackNavigationProp<MainStackParamList>
>;
export type NotificationsScreenRouteProp = RouteProp<
  MainTabsParamList,
  'Notifications'
>;

export type AccountScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, 'Account'>,
  StackNavigationProp<MainStackParamList>
>;
export type AccountScreenRouteProp = RouteProp<MainTabsParamList, 'Account'>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Profile'
>;
export type ProfileScreenRouteProp = RouteProp<MainStackParamList, 'Profile'>;

export type SettingsScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Settings'
>;
export type SettingsScreenRouteProp = RouteProp<MainStackParamList, 'Settings'>;

export type EditProfileScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'EditProfile'
>;
export type EditProfileScreenRouteProp = RouteProp<
  MainStackParamList,
  'EditProfile'
>;

/**
 * Combined Navigation Props (for screen components)
 */
export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

export interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
}

export interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
  route: ForgotPasswordScreenRouteProp;
}

export interface ResetPasswordScreenProps {
  navigation: ResetPasswordScreenNavigationProp;
  route: ResetPasswordScreenRouteProp;
}

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export interface ExploreScreenProps {
  navigation: ExploreScreenNavigationProp;
  route: ExploreScreenRouteProp;
}

export interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
  route: NotificationsScreenRouteProp;
}

export interface AccountScreenProps {
  navigation: AccountScreenNavigationProp;
  route: AccountScreenRouteProp;
}

export interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

export interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
}

export interface EditProfileScreenProps {
  navigation: EditProfileScreenNavigationProp;
  route: EditProfileScreenRouteProp;
}

declare module '@react-navigation/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface RootParamList extends RootStackParamList {}
}
