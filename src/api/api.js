import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {RNToasty} from 'react-native-toasty';

let token;

export const API_BASE_URL = 'https://mern-demo-rentease-production.up.railway.app/api';
// export const API_BASE_URL = 'http://192.168.1.5:5000/api/';

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

API.interceptors.request.use(
  function (_config) {
    if (token !== null && token !== '') {
      _config.headers.Authorization = 'Bearer' + token;
    }

    if (_config.headers['Content-Type'] !== 'multipart/form-data') {
      _config.headers['Content-Type'] = 'application/json';
    }
    return _config;
  },
  function (error) {
    console.log('API ERROR ::' + JSON.stringify(error));
  },
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.code === 'ECONNABORTED') {
      RNToasty.Show({
        title: 'Network appears to be slow, try again later',
      });
      return '';
    } else {
      if (error?.response?.status === 400) {
        const res = {
          ...error,
          data: {status: 400, ...error?.response?.data},
        };
        return res;
      }
      if (error?.response?.status === 401) {
        const res = {data: 'Invalid Token', status: 401};
        return res;
      } else if (error?.response?.status === 500) {
        const res = {
          ...error,
          data: {status: 500, ...error?.data},
        };
        return res;
      } else {
        const message = error.response.data.message;
      }
    }
  },
);

export const saveToken = data => {
  token = data;
};

export const isNetworkAvailable = async () => {
  let response = false;
  await NetInfo.fetch().then(networkState => {
    response = networkState.isConnected;
  });
  return response;
};

export const checkPermission = async item => {
  let finalData;
  if (item === 'camera') {
    let response;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.CAMERA)
        .then(async result => {
          let data;
          console.log(JSON.stringify(result));
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.CAMERA)
        .then(async result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    }
    finalData = response;
    return response;
  } else if (item === 'gallery') {
    let response;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then(async result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(async result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.LIMITED:
              data = await permissionRequest(item);
              break;
            case RESULTS.DENIED:
              data = await permissionRequest(item);
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = await permissionRequest(item);
              break;
          }
          return data;
        })
        .catch(async _error => {
          return await permissionRequest(item);
        });
    }
    finalData = response;
    return response;
  }
  return finalData;
};

export const permissionRequest = async item => {
  let finalData;
  if (item === 'camera') {
    let response;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.CAMERA).then(result => {
        let data;
        console.log(JSON.stringify(result));
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      });
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.CAMERA).then(result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      });
    }
    finalData = response;
    return response;
  } else if (item === 'gallery') {
    let response;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
        result => {
          let data;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = {
                result: false,
                permission: 'UNAVAILABLE',
              };
              break;
            case RESULTS.DENIED:
              data = {
                result: false,
                permission: 'DENIED',
              };
              break;
            case RESULTS.LIMITED:
              data = {
                result: false,
                permission: 'LIMITED',
              };
              break;
            case RESULTS.GRANTED:
              data = {
                result: true,
                permission: 'GRANTED',
              };
              break;
            case RESULTS.BLOCKED:
              data = {
                result: false,
                permission: 'BLOCKED',
              };
              break;
          }
          return data;
        },
      );
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      });
    }
    finalData = response;
    return response;
  }
  return finalData;
};
