import { Skeleton } from '@components/ui/Skeleton';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AuthScreenSkeletonProps {
  fieldCount?: number;
  showForgotLink?: boolean;
  showSecondaryButton?: boolean;
  showSocialButtons?: boolean;
  showGuestButton?: boolean;
  compactHeader?: boolean;
}

const renderFieldSkeletons = (count: number) =>
  Array.from({ length: count }).map((_, index) => (
    <View
      key={`auth-field-skeleton-${index}`}
      style={styles.fieldSkeletonBlock}
    >
      <Skeleton width={96} height={12} style={styles.fieldLabelSkeleton} />
      <Skeleton width="100%" height={48} borderRadius={12} />
    </View>
  ));

export const AuthScreenSkeleton = ({
  fieldCount = 2,
  showForgotLink = false,
  showSecondaryButton = false,
  showSocialButtons = false,
  showGuestButton = false,
  compactHeader = false,
}: AuthScreenSkeletonProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, compactHeader && styles.headerCompact]}>
        <Skeleton
          width={compactHeader ? 56 : 64}
          height={compactHeader ? 56 : 64}
          borderRadius={16}
          style={styles.logoSkeleton}
        />
        <Skeleton
          width={210}
          height={compactHeader ? 28 : 32}
          style={styles.titleSkeleton}
        />
        <Skeleton width="76%" height={14} />
      </View>

      <View style={styles.form}>
        {renderFieldSkeletons(fieldCount)}

        {showForgotLink ? (
          <Skeleton width={130} height={14} style={styles.forgotLinkSkeleton} />
        ) : null}

        <Skeleton
          width="100%"
          height={48}
          borderRadius={12}
          style={styles.primaryButtonSkeleton}
        />

        {showSecondaryButton ? (
          <Skeleton
            width="100%"
            height={48}
            borderRadius={12}
            style={styles.secondaryButtonSkeleton}
          />
        ) : null}

        {showSocialButtons ? (
          <>
            <View style={styles.dividerContainer}>
              <Skeleton width="24%" height={1} />
              <Skeleton width={120} height={12} />
              <Skeleton width="24%" height={1} />
            </View>
            <View style={styles.socialButtonsContainer}>
              <Skeleton
                width="100%"
                height={44}
                borderRadius={12}
                style={styles.flex1}
              />
              <Skeleton
                width="100%"
                height={44}
                borderRadius={12}
                style={styles.flex1}
              />
            </View>
          </>
        ) : null}

        {showGuestButton ? (
          <Skeleton
            width="100%"
            height={48}
            borderRadius={12}
            style={styles.guestButtonSkeleton}
          />
        ) : null}

        <View style={styles.footer}>
          <Skeleton width={220} height={14} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  dividerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fieldLabelSkeleton: {
    marginBottom: 8,
  },
  fieldSkeletonBlock: {
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  forgotLinkSkeleton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  form: {
    alignSelf: 'center',
    maxWidth: 384,
    width: '100%',
  },
  guestButtonSkeleton: {
    marginBottom: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 32,
  },
  headerCompact: {
    marginBottom: 32,
    marginTop: 24,
  },
  logoSkeleton: {
    marginBottom: 20,
  },
  primaryButtonSkeleton: {
    marginBottom: 16,
  },
  secondaryButtonSkeleton: {
    marginBottom: 24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  titleSkeleton: {
    marginBottom: 10,
  },
});
