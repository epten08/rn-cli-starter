export const NavigationContainer = 'NavigationContainer';
export const useNavigation = jest.fn(() => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
}));
export const useRoute = jest.fn(() => ({}));
export const useFocusEffect = jest.fn();
export const useIsFocused = jest.fn(() => true);
export const createNavigationContainerRef = jest.fn();
