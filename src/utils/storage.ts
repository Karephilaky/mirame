import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: unknown): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data', error);
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};
