import { useWindowDimensions } from 'react-native';

const BASE_WIDTH = 375; // Base width for scaling (iPhone 8)

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const scale = (size: number) => (width / BASE_WIDTH) * size;

  const isLandscape = width > height;
  const isTablet = width >= 768;

  return {
    width,
    height,
    scale,
    isLandscape,
    isTablet,
  };
};
