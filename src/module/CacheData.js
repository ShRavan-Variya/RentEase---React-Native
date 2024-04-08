import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromCachedWithKey = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((res) => {
        if (res !== null) {
          resolve(JSON.parse(res));
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};

export const saveDataToCachedWithKey = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export const removeDataFromCachedWithKey = (key) => {
  AsyncStorage.removeItem(key);
};
