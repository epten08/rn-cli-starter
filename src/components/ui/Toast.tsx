import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_CONFIG: Record<
  ToastType,
  { icon: string; backgroundColor: string; iconColor: string }
> = {
  success: {
    icon: 'checkmark-circle',
    backgroundColor: '#ecfdf5',
    iconColor: '#10b981',
  },
  error: {
    icon: 'close-circle',
    backgroundColor: '#fef2f2',
    iconColor: '#ef4444',
  },
  warning: {
    icon: 'warning',
    backgroundColor: '#fffbeb',
    iconColor: '#f59e0b',
  },
  info: {
    icon: 'information-circle',
    backgroundColor: '#eff6ff',
    iconColor: '#3b82f6',
  },
};

const DEFAULT_DURATION = 3000;

interface ToastItemProps {
  toast: Toast;
  onHide: (id: string) => void;
}

const ToastItem = ({ toast, onHide }: ToastItemProps) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const config = TOAST_CONFIG[toast.type];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      hideWithAnimation();
    }, toast.duration || DEFAULT_DURATION);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideWithAnimation = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(toast.id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { backgroundColor: config.backgroundColor },
        { transform: [{ translateY }], opacity },
      ]}
    >
      <Icon name={config.icon} size={24} color={config.iconColor} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{toast.title}</Text>
        {toast.message && <Text style={styles.message}>{toast.message}</Text>}
      </View>
      <TouchableOpacity onPress={hideWithAnimation} hitSlop={styles.hitSlop}>
        <Icon name="close" size={20} color="#6b7280" />
      </TouchableOpacity>
    </Animated.View>
  );
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const insets = useSafeAreaInsets();
  const platformTopSpacing =
    Platform.select({ ios: 10, android: 20, default: 20 }) ?? 20;

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <View
        style={[styles.toastWrapper, { top: insets.top + platformTopSpacing }]}
        pointerEvents="box-none"
      >
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onHide={hideToast} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  hitSlop: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10,
  },
  message: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  toastContainer: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toastWrapper: {
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
});
