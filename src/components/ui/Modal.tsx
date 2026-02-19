import React, { useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  position?: 'center' | 'bottom';
  style?: StyleProp<ViewStyle>;
}

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
  isLoading?: boolean;
}

export const Modal = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnBackdrop = true,
  position = 'center',
  style,
}: ModalProps) => {
  const insets = useSafeAreaInsets();
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(
    () => new Animated.Value(position === 'bottom' ? 300 : 0),
  );
  const [scaleAnim] = useState(() => new Animated.Value(0.9));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: position === 'bottom' ? 300 : 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim, scaleAnim, position]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const containerStyle =
    position === 'bottom'
      ? [
          styles.bottomContent,
          { paddingBottom: insets.bottom + 16 },
          { transform: [{ translateY: slideAnim }] },
          style,
        ]
      : [styles.centerContent, { transform: [{ scale: scaleAnim }] }, style];

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.container,
            position === 'bottom'
              ? styles.containerBottom
              : styles.containerCenter,
          ]}
          pointerEvents="box-none"
        >
          <Animated.View style={containerStyle}>
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && <Text style={styles.title}>{title}</Text>}
                {showCloseButton && (
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Icon name="close" size={24} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            )}
            {children}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export const ConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
}: ConfirmModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false}>
      <View style={styles.confirmContent}>
        <Text style={styles.confirmTitle}>{title}</Text>
        <Text style={styles.confirmMessage}>{message}</Text>
        <View style={styles.confirmButtons}>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.confirmButton, styles.cancelButton]}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={[
              styles.confirmButton,
              confirmVariant === 'danger'
                ? styles.dangerButton
                : styles.primaryButton,
            ]}
            disabled={isLoading}
          >
            <Text style={styles.confirmButtonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 24,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  centerContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    maxHeight: '80%',
    maxWidth: 400,
    padding: 24,
    width: '90%',
  },
  closeButton: {
    marginLeft: 'auto',
  },
  confirmButton: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  confirmContent: {
    alignItems: 'center',
  },
  confirmMessage: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  confirmTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  containerBottom: {
    justifyContent: 'flex-end',
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  keyboardView: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
  },
  title: {
    color: '#111827',
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
});
