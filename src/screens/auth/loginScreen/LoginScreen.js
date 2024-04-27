import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RNToasty} from 'react-native-toasty';
import InputText from '../../../components/InputText/InputText';
import {AppConstants, cacheData} from '../../../module';
import {Loader} from '../../../components/Loader';
import {Button} from '../../../components/Button';
import {isNetworkAvailable, saveToken} from '../../../api';
import {Validations} from '../../../constants';
import {login} from '../../../services/auth';
import Theme from '../../../theme/Theme';
import styles from './styles';

const LoginScreen = props => {
  // All states
  const [loading, setLoading] = useState(false)
  // ## Main states
  const [email, setEmail] = useState('ashishpipaliya78@yopmail.com');
  const [password, setPassword] = useState('!!P@ssw0rd!!');
  const [isCheck, setIsCheck] = useState(false);
  const [secure, setIsSecure] = useState(false);
  // ## Error states
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const toggleCheck = () => {
    setIsCheck(!isCheck);
  };

  const isValid = () => {
    let validate = true;

    setErrorEmail('');
    setErrorPassword('');

    if (!Validations.isValidEmail(email)) {
      validate = false;
      setErrorEmail('*Please enter valid email!');
    } else if (!Validations.isValidPassword(password)) {
      validate = false;
      setErrorPassword(
        '*Password must have 8 characters with 1 speacial character 1 capital 1 smallcase and 1 number!',
      );
    }

    return validate;
  };

  const doLogin = async () => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);
    if (isConnected) {
      try {
        const data = {
          email: email,
          password: password,
        }
        const response = await login(data);
        console.log('====================================');
        console.log("response::",JSON.stringify(response));
        console.log('====================================');
        setLoading(false);
        if (response && response.status) {
          const data = response.data
          const CacheKey = AppConstants.AsyncKeyLiterals;

          cacheData.saveDataToCachedWithKey(CacheKey.isLoggedIn, true);
          cacheData.saveDataToCachedWithKey(CacheKey.userData, data);
          cacheData.saveDataToCachedWithKey(CacheKey.loginUserId, data.id);
          cacheData.saveDataToCachedWithKey(CacheKey.token, data.token);
          cacheData.saveDataToCachedWithKey(CacheKey.userType, data.user_type);

          saveToken(data.token);

          if (data.user_type === 2) {
            props.navigation.navigate('PreferenceScreen');
          } else {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'ScreenStackNavigation'}],
            });
          }
        } else {
          setLoading(false);
          const message = response.message;
          RNToasty.Show({title: message});
        }
      } catch (error) {
        setLoading(false);
        console.log('====================================');
        console.log("error::",JSON.stringify(error));
        console.log('====================================');
        RNToasty.Show({title: error.message});
      }
    } else {
      setLoading(false);
      RNToasty.Show({title: 'No internet connection available!'});
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor={Theme.colors.bgColor4}
        barStyle={'dark-content'}
        hidden={false}
      />
      <SafeAreaView style={styles.viewMainContainer}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.viewTop}>
              <Image style={styles.appImage} source={Theme.icons.AppIcon} />
              <Text style={styles.textTitle}>Welcome back!</Text>
            </View>
            <View style={styles.viewMain}>
              <InputText
                title={'Email'}
                placeholder={'Enter your email'}
                value={email}
                onChangeText={setEmail}
                error={errorEmail}
              />
              <InputText
                title={'Password'}
                placeholder={'Enter your password'}
                value={password}
                secure={secure}
                onChangeSecurity={() => {
                  setIsSecure(!secure);
                }}
                isPassword={true}
                onChangeText={setPassword}
                error={errorPassword}
              />
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.viewBottom}>
            <View style={styles.viewRow}>
              <TouchableOpacity onPress={toggleCheck}>
                <Image
                  style={styles.checkBox}
                  source={
                    isCheck === true ? Theme.icons.Check : Theme.icons.UnCheck
                  }
                />
              </TouchableOpacity>
              <Text style={styles.smallText}>Remember Me</Text>
            </View>
            <Button
              title={'LOG IN'}
              viewMain={{marginHorizontal: 0}}
              onPress={() => {
                if (isValid()) {
                  doLogin()
                }
              }}
            />
            <View style={styles.textViewSignUp}>
              <Text style={styles.textCommon}>
                New To RentEase?
                <Text
                  style={styles.textBold}
                  onPress={() => {
                    props.navigation.navigate('RegisterScreen');
                  }}>
                  {' '}
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <Loader isLoading={loading} />
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
