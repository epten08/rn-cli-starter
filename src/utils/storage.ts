import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Logger } from 'utils/logger';

class StorageService {
  //set item in asyncstorage
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      Logger.error('Storage setItem error', error);
      throw error;
    }
  }

  //get item from asyncstorage
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      Logger.error('Storage getItem error', error);
      return null;
    }
  }

  //remove item from asyncstorage
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      Logger.error('Storage removeItem error', error);
      throw error;
    }
  }

  //clear all asyncstorage
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      Logger.error('Storage clear error', error);
      throw error;
    }
  }

  //set item in encrypted storage
  async setSecureItem(key: string, value: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      Logger.error('Secure Storage setItem error', error);
      throw error;
    }
  }

  //get item from encrypted storage
  async getSecureItem(key: string): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      Logger.error('Secure Storage getItem error', error);
      return null;
    }
  }

  //remove item from encrypted storage
  async removeSecureItem(key: string): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      Logger.error('Secure Storage removeItem error', error);
      throw error;
    }
  }

  //clear all encrypted storage
  async clearSecure(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      Logger.error('Secure Storage clear error', error);
      throw error;
    }
  }

  // store object in asyncstorage
  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setItem(key, jsonValue);
    } catch (error) {
      Logger.error('Storage setObject error', error);
      throw error;
    }
  }

  // retrieve object from asyncstorage
  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getItem(key);
      return jsonValue ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      Logger.error('Storage getObject error', error);
      return null;
    }
  }

  // get all keys from asyncstorage
  async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      Logger.error('Storage getAllKeys error:', error);
      return [];
    }
  }

  // multi get items from asyncstorage
  async multiGet(keys: string[]): Promise<readonly [string, string | null][]> {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      Logger.error('Storage multiGet error:', error);
      return [];
    }
  }

  // multi set items in asyncstorage
  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      Logger.error('Storage multiSet error:', error);
      throw error;
    }
  }

  // multi remove items from asyncstorage
  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      Logger.error('Storage multiRemove error:', error);
      throw error;
    }
  }
}
export const storage = new StorageService();
