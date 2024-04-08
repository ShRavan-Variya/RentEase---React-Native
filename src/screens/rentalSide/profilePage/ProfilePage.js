import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {Header} from '../../../components/Header';
import Theme from '../../../theme/Theme';
import { AppConstants, cacheData } from '../../../module';

const ProfilePage = props => {

  const doLogout = () => {
    const appData = AppConstants.AsyncKeyLiterals
    cacheData.removeDataFromCachedWithKey(appData.isLoggedIn)
    cacheData.removeDataFromCachedWithKey(appData.userData)
    cacheData.removeDataFromCachedWithKey(appData.loginUserId)
    cacheData.removeDataFromCachedWithKey(appData.token)
    cacheData.removeDataFromCachedWithKey(appData.userType)


    props.navigation.reset({
      index: 0,
      routes: [{name: 'SplashScreen'}]
    })
  }
  
  return (
    <SafeAreaView style={styles.viewMainContainer}>
      <View style={styles.container}>
        <Header title={'RentEase'} showIcon={0} onPress={()=>{props.navigation.navigate('ProfilePage')}} />

        <View style={styles.viewMain}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SettingScreen');
            }}>
            <Text style={styles.textTitle}>Account Settings</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textTitle}>Terms & Conditions</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textTitle}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textTitle}>Rate Us</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textTitle}>Share App</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBranding}>
          <Text style={styles.textSmall}>V 0.0.1</Text>
          <Text style={styles.textSmall}>ASHISH PIPALIYA</Text>
          <Text style={styles.textSmallBlue}>+91 63543 48235</Text>
        </View>
        <View style={styles.viewBottom}>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => {
              doLogout();
            }}>
            <Image style={styles.logOutIcon} source={Theme.icons.LogOut} />
            <Text style={styles.textRed}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
