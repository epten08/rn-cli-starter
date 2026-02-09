import { Button } from '@components/ui/Button';
import { Screen } from '@components/ui/Screen';
import { STORAGE_KEYS } from '@constants/app.constants';
import type { OnboardingSlide } from '@constants/onboarding.constants';
import { onboardingSlides } from '@constants/onboarding.constants';
import { storage } from '@utils/storage';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import type { ViewToken } from 'react-native';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

// Placeholder images from picsum
const SLIDE_IMAGES = [
  'https://picsum.photos/seed/sync1/800/800',
  'https://picsum.photos/seed/sync2/800/800',
  'https://picsum.photos/seed/sync3/800/800',
];

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useMemo(() => new Animated.Value(0), []);

  const isLastSlide = currentIndex === onboardingSlides.length - 1;

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

  const renderSlide = ({
    item,
    index,
  }: {
    item: OnboardingSlide;
    index: number;
  }) => {
    return (
      <View style={[styles.slideContainer, { width }]}>
        <View style={styles.slideContent}>
          {/* Subtle decoration */}
          <View style={styles.blob1} />
          <View style={styles.blob2} />

          <View style={styles.imageCard}>
            <Image
              source={{ uri: SLIDE_IMAGES[index] }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const paginatorDots = useMemo(() => {
    return onboardingSlides.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

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

      return { key: i.toString(), dotWidth, opacity };
    });
  }, [scrollX]);

  return (
    <Screen safeArea={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            title="Skip"
            variant="ghost"
            onPress={handleSkip}
            size="sm"
            textStyle={styles.skipText}
          />
        </View>

        <FlatList
          ref={flatListRef}
          data={onboardingSlides}
          renderItem={renderSlide}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />

        <View style={styles.footer}>
          <View style={styles.paginatorContainer}>
            {paginatorDots.map((dot, i) => (
              <Animated.View
                key={dot.key}
                style={[
                  styles.dot,
                  { width: dot.dotWidth, opacity: dot.opacity },
                  i === currentIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={isLastSlide ? 'Get Started' : 'Next'}
              onPress={handleNext}
              size="lg"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#0ea5e9', // primary-500
  },
  blob1: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 256,
    height: 256,
    backgroundColor: '#e0f2fe', // primary-100
    borderRadius: 999,
    opacity: 0.3,
    zIndex: -1,
  },
  blob2: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    width: 192,
    height: 192,
    backgroundColor: '#f3e8ff', // secondary-100
    borderRadius: 999,
    opacity: 0.3,
    zIndex: -1,
  },
  buttonContainer: {
    marginTop: 32,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    textAlign: 'center',
    lineHeight: 24,
  },
  dot: {
    borderRadius: 999,
    height: 8,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageCard: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 384, // max-w-sm
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 48,
    borderWidth: 1,
    borderColor: '#f3f4f6', // gray-100
    // Shadow details
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  inactiveDot: {
    backgroundColor: '#9ca3af', // gray-400
  },
  paginatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    height: 64,
    justifyContent: 'center',
  },
  skipText: {
    color: '#9ca3af', // gray-400
  },
  slideContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  slideContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 320, // max-w-xs
  },
  title: {
    fontSize: 30, // 3xl
    fontWeight: '700',
    color: '#111827', // gray-900
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
});

export default OnboardingScreen;
