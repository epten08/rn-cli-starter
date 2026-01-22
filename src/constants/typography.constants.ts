import { useResponsive } from '@utils/responsive';
import { useMemo } from 'react';

export const useTypography = () => {
  const { scale } = useResponsive();

  const FONT_SIZES = useMemo(
    () =>
      ({
        xs: scale(12),
        sm: scale(14),
        md: scale(16),
        lg: scale(20),
        xl: scale(24),
      }) as const,
    [scale],
  );

  const SPACING = useMemo(
    () =>
      ({
        xs: scale(4),
        sm: scale(8),
        md: scale(16),
        lg: scale(24),
        xl: scale(32),
        xxl: scale(48),
      }) as const,
    [scale],
  );

  return { FONT_SIZES, SPACING };
};
