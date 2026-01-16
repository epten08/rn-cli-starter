import { STORAGE_KEYS } from '@constants/app.constants';
import { Logger } from '@utils/logger';
import { storage } from '@utils/storage';
import { useEffect, useState } from 'react';

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await storage.getItem(
        STORAGE_KEYS.APP.ONBOARDING_COMPLETE,
      );
      setIsOnboardingComplete(completed === 'true');
      Logger.info('Onboarding status:', { completed: completed === 'true' });
    } catch (error) {
      Logger.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await storage.setItem(STORAGE_KEYS.APP.ONBOARDING_COMPLETE, 'true');
      setIsOnboardingComplete(true);
      Logger.info('Onboarding completed');
    } catch (error) {
      Logger.error('Error completing onboarding:', error);
    }
  };

  const resetOnboarding = async () => {
    try {
      await storage.removeItem(STORAGE_KEYS.APP.ONBOARDING_COMPLETE);
      setIsOnboardingComplete(false);
      Logger.info('Onboarding reset');
    } catch (error) {
      Logger.error('Error resetting onboarding:', error);
    }
  };

  return {
    isOnboardingComplete,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
};
