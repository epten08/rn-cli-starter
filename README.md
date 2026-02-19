# React Native Starter

A production-ready React Native starter template with authentication, navigation, state management, and essential UI components.

## Features

- **Authentication** - Login, Register, Forgot Password with secure token storage
- **Navigation** - Stack & Tab navigation with React Navigation v7
- **State Management** - Redux Toolkit with persistence
- **API Client** - Axios with interceptors and token refresh
- **i18n** - Multi-language support (EN, ES, FR)
- **UI Components** - Button, Input, Card, Modal, Toast, and more
- **TypeScript** - Full type safety with strict mode
- **Testing** - Jest setup with unit tests

---

## Getting Started

### Prerequisites

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### Installation

```sh
# Install dependencies
npm install

# iOS only - Install CocoaPods
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running the App

```sh
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## Project Structure

```
src/
├── adapters/        # Data transformation adapters
├── api/             # API client configuration
├── components/      # Reusable UI components
│   ├── ui/          # Core UI components
│   └── common/      # Shared components
├── config/          # App configuration
├── constants/       # App constants
├── dto/             # Data transfer objects
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization
├── navigation/      # Navigation setup
├── repositories/    # API repositories
├── screens/         # Screen components
├── services/        # Business logic services
├── store/           # Redux store & slices
├── types/           # TypeScript types
├── utils/           # Utility functions
└── validations/     # Zod validation schemas
```

---

## UI Components

### Toast Notifications

Display toast messages for success, error, warning, and info states.

```tsx
import { useToast } from '@hooks/useToast';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast({
      type: 'success',
      title: 'Saved!',
      message: 'Your changes have been saved',
      duration: 3000, // optional, defaults to 3000ms
    });
  };

  const handleError = () => {
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong',
    });
  };

  return <Button title="Save" onPress={handleSuccess} />;
};
```

**Toast Types:** `success` | `error` | `warning` | `info`

---

### Card

Flexible card component with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@components/ui/Card';

// Basic card
<Card>
  <Text>Card content</Text>
</Card>

// Full card with sections
<Card variant="elevated" padding="lg">
  <CardHeader
    title="Card Title"
    subtitle="Optional subtitle"
    right={<Icon name="chevron-forward" />}
  />
  <CardContent>
    <Text>Main content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button title="Action" onPress={() => {}} />
  </CardFooter>
</Card>

// Pressable card
<Card variant="outlined" onPress={() => navigate('Details')}>
  <Text>Tap me</Text>
</Card>
```

**Props:**

- `variant`: `'elevated'` | `'outlined'` | `'filled'` (default: `'elevated'`)
- `padding`: `'none'` | `'sm'` | `'md'` | `'lg'` (default: `'md'`)
- `onPress`: Optional press handler

---

### Skeleton

Animated loading placeholders for content that is still being fetched or prepared.

```tsx
import { Skeleton } from '@components/ui/Skeleton';

<View>
  <Skeleton width={120} height={18} style={{ marginBottom: 8 }} />
  <Skeleton width="70%" height={14} style={{ marginBottom: 16 }} />
  <Skeleton width="100%" height={120} borderRadius={16} />
</View>;
```

**Props:**

- `width`: Number or percentage string (default: `'100%'`)
- `height`: Number or percentage string (default: `16`)
- `borderRadius`: Number (default: `8`)
- `variant`: `'rect'` | `'circle'` (default: `'rect'`)
- `animated`: boolean (default: `true`)

---

### Modal

Customizable modal with center and bottom sheet positions.

```tsx
import { Modal, ConfirmModal } from '@components/ui/Modal';

// Basic modal
const [visible, setVisible] = useState(false);

<Modal
  visible={visible}
  onClose={() => setVisible(false)}
  title="Modal Title"
  position="center" // or "bottom"
>
  <Text>Modal content</Text>
  <Button title="Close" onPress={() => setVisible(false)} />
</Modal>

// Confirmation modal
<ConfirmModal
  visible={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Item?"
  message="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  confirmVariant="danger" // or "primary"
  isLoading={isDeleting}
/>
```

**Modal Props:**

- `position`: `'center'` | `'bottom'`
- `showCloseButton`: boolean (default: `true`)
- `closeOnBackdrop`: boolean (default: `true`)

---

### Button

Customizable button with variants, sizes, and loading state.

```tsx
import { Button } from '@components/ui/Button';

<Button
  title="Primary Button"
  onPress={() => {}}
  variant="primary"
  size="md"
/>

<Button
  title="Loading..."
  onPress={() => {}}
  isLoading={true}
/>

<Button
  title="With Icon"
  onPress={() => {}}
  leftIcon={<Icon name="add" />}
  variant="outline"
/>
```

**Props:**

- `variant`: `'primary'` | `'secondary'` | `'outline'` | `'ghost'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `isLoading`: boolean
- `disabled`: boolean
- `leftIcon` / `rightIcon`: ReactNode

---

### Input

Text input with label, error state, and icon support.

```tsx
import { Input } from '@components/ui/Input';

<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  leftIcon={<Icon name="mail-outline" />}
/>

<Input
  label="Password"
  placeholder="Enter password"
  secureTextEntry={!showPassword}
  value={password}
  onChangeText={setPassword}
  rightIcon={<Icon name={showPassword ? 'eye-off' : 'eye'} />}
  onRightIconPress={() => setShowPassword(!showPassword)}
/>
```

---

## Hooks

### useToast

Access toast notifications anywhere in your app.

```tsx
const { showToast, hideToast } = useToast();
```

### useNetworkStatus

Monitor network connectivity status.

```tsx
import { useNetworkStatus } from '@hooks/useNetworkStatus';

const { isConnected, checkConnection } = useNetworkStatus();

// isConnected: boolean - current connection status
// checkConnection: () => Promise<boolean> - manually check connection
```

The `NetworkStatusBar` component automatically displays a banner when offline.

### useAuth

Access authentication state and actions.

```tsx
import { useAuth } from '@hooks/useAuth';

const { user, isAuthenticated, isLoading, error, login, register, logout } =
  useAuth();

// Login
await login({ email: 'user@example.com', password: 'password' });

// Register
await register({
  email: 'user@example.com',
  password: 'password',
  firstName: 'John',
  lastName: 'Doe',
});

// Logout
await logout();
```

### useTranslation

Access i18n translations.

```tsx
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Use translation
<Text>{t('common.welcome')}</Text>;

// Change language
i18n.changeLanguage('es');
```

---

## State Management

Redux Toolkit slices are located in `src/store/slices/`:

- `auth.slice.ts` - Authentication state
- `app.slice.ts` - App-wide state (theme, language, notifications)
- `user.slice.ts` - User profile data

```tsx
import { useAppSelector, useAppDispatch } from '@hooks/useRedux';
import { setTheme } from '@store/slices/app.slice';

const theme = useAppSelector(state => state.app.theme);
const dispatch = useAppDispatch();

dispatch(setTheme('dark'));
```

---

## Navigation

Navigate between screens using the navigation helpers:

```tsx
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

// Navigate to screen
navigation.navigate('Settings');

// Navigate with params
navigation.navigate('Profile', { userId: '123' });

// Go back
navigation.goBack();
```

---

## Testing

```sh
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.service.test.ts
```

---

## Environment Configuration

Create a `.env` file in the root directory:

```env
API_BASE_URL=https://api.example.com/v1
API_TIMEOUT=30000
```

Access config values:

```tsx
import Config from 'react-native-config';

const apiUrl = Config.API_BASE_URL;
```

---

## Scripts

```sh
npm start          # Start Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS
npm test           # Run tests
npm run lint       # Run ESLint
```

---

## Tech Stack

- **React Native** 0.83.1
- **React** 19.2.3
- **TypeScript** 5.x
- **Redux Toolkit** + redux-persist
- **React Navigation** 7.x
- **Axios** for API calls
- **i18next** for internationalization
- **Zod** for validation
- **Jest** for testing

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.
