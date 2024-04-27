import React, {useEffect, useState} from 'react';
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
import {RadioGroup} from '../../../components/RadioButton';
import {Button} from '../../../components/Button';
import {Loader} from '../../../components/Loader';
import {isNetworkAvailable, saveToken} from '../../../api';
import {register} from '../../../services/auth';
import {Validations} from '../../../constants';
import Theme from '../../../theme/Theme';
import styles from './styles';
import { AppConstants, cacheData } from '../../../module';


const RegisterScreen = props => {
  //All States
  const [loading, setLoading] = useState(false)
  //Main States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [secure, setIsSecure] = useState(false);
  const [secureConfirm, setIsSecureConfirm] = useState(false);
  const [listResidenceType, setListResidenceType] = useState([]);
  //Error States
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNo, setErrorMobileNo] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  useEffect(() => {
    doGetData();
  }, []);

  const doGetData = () => {
    const newListRecidenceType = [];
    newListRecidenceType.push({id: 1, title: 'Home Owner', isSelected: false});
    newListRecidenceType.push({id: 2, title: 'Rental', isSelected: true});
    setListResidenceType(newListRecidenceType);
  };
  const toggleCheck = () => {
    setIsCheck(!isCheck);
  };

  const isValid = () => {
    let validate = true;

    setErrorFirstName('');
    setErrorLastName('');
    setErrorMobileNo('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');

    if (firstName.trim().length === 0) {
      validate = false;
      setErrorFirstName('*Please enter the first name');
    } else if (lastName.trim().length === 0) {
      validate = false;
      setErrorLastName('*Please enter the last name');
    } else if (mobileNo.trim().length !== 10) {
      validate = false;
      setErrorMobileNo('*Mobile number must have 10 numbers');
    } else if (!Validations.isValidEmail(email)) {
      validate = false;
      setErrorEmail('*Please enter valid email!');
    } else if (!Validations.isValidPassword(password)) {
      validate = false;
      setErrorPassword(
        '*Password must have 8 characters with 1 speacial character 1 capital 1 smallcase and 1 number!',
      );
    } else if (confirmPassword !== password) {
      validate = false;
      setErrorConfirmPassword('*Password is not match');
    }

    return validate;
  };


  const doSignup = async () => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);
    if (isConnected) {
      try {
        let userType;
        listResidenceType.map(item => {
          if (item.isSelected) {
            userType = item.id;
          }
        })
        const data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          user_type: userType,
          phone_number: mobileNo,
        }
        const response = await register(data);
          console.log('====================================');
          console.log("message:::",JSON.stringify(response));
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
              <Text style={styles.textTitle}>Welcome!</Text>
            </View>
            <View style={styles.viewMain}>
              <View style={styles.viewRow}>
                <View style={styles.viewMRight}>
                  <InputText
                    title={'First Name'}
                    placeholder={'Enter your first name'}
                    value={firstName}
                    onChangeText={setFirstName}
                    error={errorFirstName}
                  />
                </View>
                <View style={styles.viewMLeft}>
                  <InputText
                    title={'Last Name'}
                    placeholder={'Enter your last name'}
                    value={lastName}
                    onChangeText={setLastName}
                    error={errorLastName}
                  />
                </View>
              </View>
              <InputText
                title={'Mobile No'}
                placeholder={'Enter your mobile no'}
                value={mobileNo}
                onChangeText={setMobileNo}
                error={errorMobileNo}
              />
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
              <InputText
                title={'Confirm Password'}
                placeholder={'Enter your confirm password'}
                value={confirmPassword}
                secure={secureConfirm}
                onChangeSecurity={() => {
                  setIsSecureConfirm(!secureConfirm);
                }}
                isPassword={true}
                onChangeText={setConfirmPassword}
                error={errorConfirmPassword}
              />

              <RadioGroup
                title="Choose Residence Type"
                ListData={listResidenceType}
                onChange={indexMain => {
                  const newList = [...listResidenceType];
                  newList.map((item, index) => {
                    if (index === indexMain) {
                      item.isSelected = true;
                    } else {
                      item.isSelected = false;
                    }
                  });
                  setListResidenceType(newList);
                }}
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
              <Text style={styles.smallText}>
                By signing up, I agree to Terms of service and Policy
              </Text>
            </View>
            <Button
              title={'SIGN UP'}
              viewMain={{marginHorizontal: 0}}
              onPress={() => {
                if (isValid()) {
                  doSignup()
                }
              }}
            />
            <View style={styles.textViewLogIn}>
              <Text style={styles.textCommon}>
                Already have an account?
                <Text
                  style={styles.textBold}
                  onPress={() => {
                    props.navigation.navigate('LoginScreen');
                  }}>
                  {' '}
                  Log In
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

export default RegisterScreen;


