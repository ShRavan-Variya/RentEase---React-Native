import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import { AppConstants, cacheData } from '../../../module';
import { saveToken } from '../../../api';
import Theme from '../../../theme/Theme';
import styles from './styles';
const SplashScreen = props => {
  useEffect(() => {
    setTimeout(async () => {
      try {
        const isLoggedIn = await cacheData.getDataFromCachedWithKey(
          AppConstants.AsyncKeyLiterals.isLoggedIn,
        );

        if (isLoggedIn) {
          const userData = await cacheData.getDataFromCachedWithKey(
            AppConstants.AsyncKeyLiterals.userData,
          );



          if (userData && userData !== undefined && userData !== null) {
            const CacheKey = AppConstants.AsyncKeyLiterals;

            cacheData.saveDataToCachedWithKey(CacheKey.isLoggedIn, true);
            cacheData.saveDataToCachedWithKey(CacheKey.userData, userData);
            cacheData.saveDataToCachedWithKey(CacheKey.loginUserId, userData.id);
            cacheData.saveDataToCachedWithKey(CacheKey.token, userData.token);
            cacheData.saveDataToCachedWithKey(CacheKey.userType, userData.user_type);
  
            saveToken(userData.token);
  
            if (userData.user_type === 2) {
              props.navigation.navigate('PreferenceScreen');
            } else {
              props.navigation.reset({
                index: 0,
                routes: [{name: 'ScreenStackNavigation'}],
              });
            }
          } else {
            throw new Error('No user data!');
          }
        } else {
          throw new Error("User isn't logged in");
        }
      } catch (err) {
        props.navigation.reset({
          index: 0,
          routes: [{name:'LoginScreen'}],
        });
      }
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={Theme.colors.bgColor1}
        barStyle={'light-content'}
        hidden={true}
      />
      <SafeAreaView style={styles.viewMainContainer}>
        <View style={styles.container}>
          <Image style={styles.appImage} source={Theme.icons.AppIcon} />
          <Text style={styles.textTitle}>RentEase</Text>
          <Text style={styles.textSubTitle}>Find Your Ideal Rental Home</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;

