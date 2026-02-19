import { useNetworkStatus } from '@hooks/useNetworkStatus';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export const NetworkStatusBar = () => {
  const { isConnected } = useNetworkStatus();
  const insets = useSafeAreaInsets();
  const [translateY] = useState(() => new Animated.Value(-50));
  const previousConnectionState = useRef(isConnected);

  useEffect(() => {
    const wasConnected = previousConnectionState.current;
    previousConnectionState.current = isConnected;

    if (!isConnected) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      return;
    }

    if (wasConnected) {
      return;
    }

    const timeoutId = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 2000); // Show "back online" for 2 seconds

    return () => clearTimeout(timeoutId);
  }, [isConnected, translateY]);

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        { transform: [{ translateY }] },
        isConnected ? styles.connected : styles.disconnected,
      ]}
    >
      <Icon
        name={isConnected ? 'wifi' : 'cloud-offline'}
        size={16}
        color="#ffffff"
      />
      <Text style={styles.text}>
        {isConnected ? 'Back online' : 'No internet connection'}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  connected: {
    backgroundColor: '#10b981',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    left: 0,
    paddingBottom: 8,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9998,
  },
  disconnected: {
    backgroundColor: '#ef4444',
  },
  text: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
