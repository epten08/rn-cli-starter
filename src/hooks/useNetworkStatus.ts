import NetInfo from '@react-native-community/netinfo';
import { setNetworkStatus } from '@store/slices/app.slice';
import { useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from './useRedux';

export const useNetworkStatus = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(state => state.app.isNetworkConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;
      dispatch(setNetworkStatus(connected));
    });

    // Check initial state
    NetInfo.fetch().then(state => {
      dispatch(setNetworkStatus(state.isConnected ?? false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const checkConnection = useCallback(async () => {
    const state = await NetInfo.fetch();
    const connected = state.isConnected ?? false;
    dispatch(setNetworkStatus(connected));
    return connected;
  }, [dispatch]);

  return {
    isConnected,
    checkConnection,
  };
};
