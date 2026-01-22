import { STORAGE_KEYS } from '@constants/app.constants';
import type { OnboardingSlide } from '@constants/onboarding.constants';
import { onboardingSlides } from '@constants/onboarding.constants';
import { useTypography } from '@constants/typography.constants';
import { useResponsive } from '@utils/responsive';
import { storage } from '@utils/storage';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  type ViewToken,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useMemo(() => new Animated.Value(0), []);
  const { width } = useResponsive();
  const { FONT_SIZES, SPACING } = useTypography();

  const slideWidth = width;

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await storage.setItem(STORAGE_KEYS.APP.ONBOARDING_COMPLETE, 'true');
    onComplete();
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
    [],
  );

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 50,
    }),
    [],
  );

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View
      style={[
        styles.slide,
        { backgroundColor: item.backgroundColor, width: slideWidth },
      ]}
    >
      <View style={{ marginBottom: SPACING.xxl }}>
        <Icon name={item.icon} size={SPACING.xxl * 2.5} color="#FFFFFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: FONT_SIZES.xl * 1.2 }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { fontSize: FONT_SIZES.md }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const paginationDots = useMemo(
    () =>
      onboardingSlides.map((_, index) => {
        const inputRange = [
          (index - 1) * slideWidth,
          index * slideWidth,
          (index + 1) * slideWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
          />
        );
      }),
    [scrollX, slideWidth],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      <View style={styles.paginationContainer}>{paginationDots}</View>

      <View style={styles.footer}>
        {currentIndex < onboardingSlides.length - 1 ? (
          <>
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextText}>Next</Text>
              <Icon name="arrow-forward" size={SPACING.lg} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={handleComplete}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Icon name="checkmark" size={SPACING.lg} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  description: {
    color: '#FFFFFF',

    lineHeight: 24,
    opacity: 0.9,
    textAlign: 'center',
  },
  dot: {
    backgroundColor: '#0ea5e9',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  getStartedButton: {
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    borderRadius: 24,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paginationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
