import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {Header} from '../../../components/Header';
import {InputText} from '../../../components/InputText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Button } from '../../../components/Button';
import { Validations } from '../../../constants';

const SettingScreen = (props) => {
  //All States
  //Main States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  //Error States
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNo, setErrorMobileNo] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFlatNo, setErrorFlatNo] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [errorArea, setErrorArea] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorPinCode, setErrorPinCode] = useState('');
  const [errorState, setErrorState] = useState('');


  
  const isValid = () => {
    let validate = true;

    setErrorFirstName('');
    setErrorLastName('');
    setErrorMobileNo('');
    setErrorEmail('');
    setErrorFlatNo('');
    setErrorAddress('');
    setErrorArea('');
    setErrorCity('');
    setErrorPinCode('');
    setErrorState('');


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
    } else if (flatNo.trim().length === 0) {
      validate = false;
      setErrorFlatNo('*Please enter the flat-no!');
    } else if (address.trim().length === 0) {
      validate = false;
      setErrorAddress('*Please enter the address!');
    } else if (area.trim().length === 0) {
      validate = false;
      setErrorArea('*Please enter your area!');
    } else if (city.trim().length === 0) {
      validate = false;
      setErrorCity('*Please enter your city!');
    } else if (pinCode.trim().length !== 6) {
      validate = false;
      setErrorPinCode('*Please enter your pincode!');
    } else if (state.trim().length === 0) {
      validate = false;
      setErrorState('*Please enter your state!');
    }

    return validate;
  };

  return (
    <SafeAreaView style={styles.viewMainContainer}>
      <View style={styles.container}>
        <Header title={'RentEase'} showIcon={0} ProfileIcon={false} />

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentScrollView}>
          <View>
            <View style={[styles.viewRow, styles.viewMargin]}>
              <View style={styles.viewMR08}>
                <InputText
                  title={'First Name'}
                  placeholder={'Enter your first name'}
                  value={firstName}
                  onChangeText={setFirstName}
                  error={errorFirstName}
                />
              </View>
              <View style={styles.viewML08}>
                <InputText
                  title={'Last Name'}
                  placeholder={'Enter your last name'}
                  value={lastName}
                  onChangeText={setLastName}
                  error={errorLastName}
                />
              </View>
            </View>
            <View style={styles.viewMargin}>
              <InputText
                title={'Mobile No'}
                placeholder={'Enter your mobile no'}
                value={mobileNo}
                keyboardType={'number-pad'}
                onChangeText={setMobileNo}
                error={errorMobileNo}
              />
            </View>
            <View style={styles.viewMargin}>
              <InputText
                title={'Email'}
                placeholder={'Enter your email'}
                value={email}
                onChangeText={setEmail}
                error={errorEmail}
              />
            </View>
            <View style={styles.viewMargin}>
              <InputText
                title={'Flat/Home Number'}
                placeholder={'Enter your flat/home number'}
                value={flatNo}
                onChangeText={setFlatNo}
                error={errorFlatNo}
              />
            </View>
            <View style={styles.viewMargin}>
              <InputText
                title={'Address'}
                placeholder={'Enter your address'}
                value={address}
                onChangeText={setAddress}
                error={errorAddress}
              />
            </View>
            <View style={styles.viewMargin}>
              <InputText
                title={'Area'}
                placeholder={'Enter your area'}
                value={area}
                onChangeText={setArea}
                error={errorArea}
              />
            </View>
            <View style={[styles.viewRow, styles.viewMargin]}>
              <View style={styles.viewMR08}>
                <InputText
                  title={'City'}
                  placeholder={'Enter your city'}
                  value={city}
                  onChangeText={setCity}
                  error={errorCity}
                />
              </View>
              <View style={styles.viewML08}>
                <InputText
                  title={'Pincode'}
                  placeholder={'Enter your pincode'}
                  value={pinCode}
                  keyboardType={'number-pad'}
                  onChangeText={setPinCode}
                  error={errorPinCode}
                />
              </View>
            </View>
            <View style={styles.viewMargin}>
              <InputText
                title={'State'}
                placeholder={'Enter your state'}
                value={state}
                onChangeText={setState}
                error={errorState}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Button
            title={'SAVE'}
            onPress={() => {
              if (isValid()) {
                props.navigation.navigate('ProfilePage');   
              }}}
          />
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
