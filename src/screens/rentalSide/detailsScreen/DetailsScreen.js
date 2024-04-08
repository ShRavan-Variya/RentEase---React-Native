import React, { useEffect, useState } from 'react';
import { Image, Modal, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Header } from '../../../components/Header';
import Theme from '../../../theme/Theme';
import { HomeDetails } from '../../../components/HomeDetails';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserInfo from '../../../components/UserInfo/UserInfo';
import { HomeImage } from '../../../components/HomeImage';
import ImageOfHome from '../../../components/Image/ImageOfHome';
import { InputText } from '../../../components/InputText';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import {
  CustomMenu,
  CustomMenuFacilities,
  SelectListType,
} from '../../../components/CustomMenu';
import { Button } from '../../../components/Button';
import defaultPopupData from '../../../defaultData/defaultPopupData';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native';
import { AppConstants, cacheData } from '../../../module';
import { isNetworkAvailable } from '../../../api';
import { Loader } from '../../../components/Loader';
import { RNToasty } from 'react-native-toasty';
import axios from 'axios';
import { property } from '../../../services/auth';

const DetailsScreen = props => {
  //All States
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  //Main States
  const [mainImage, setMainImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [rent, setRent] = useState('');
  const [deposite, setDeposite] = useState('');
  const [isRental, setIsRental] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isOnPress, setIsOnPress] = useState(false);
  const [listDataHome, setListDataHome] = useState([]);
  const [listDataFacilities, setListDataFacilities] = useState([]);
  const [listDataAdvantage, setListDataAdvantage] = useState([]);
  const [listDataNearBy, setListDataNearBy] = useState([]);
  const [listImages, setListImages] = useState([]);
  //Error States
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNo, setErrorMobileNo] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorState, setErrorState] = useState('');
  const [errorArea, setErrorArea] = useState('');
  const [errorHomeDetailsData, setErrorHomeDetailsData] = useState('');
  const [errorFacilitiesData, setErrorFacilitiesData] = useState('');
  const [errorAdvantagesData, setErrorAdvantagesData] = useState('');
  const [errorNearByData, setErrorNearByData] = useState('');
  const [errorListImages, setErrorListImages] = useState('');

  //  HomeDetailsModal
  const [selectTypeList, setSelectTypeList] = useState(false);
  const [listSelectType, setListSelectType] = useState([]);
  const [errorSelectType, setErrorSelectType] = useState('');
  const [isRoomDataVisible, setIsRoomDataVisible] = useState(false);
  const [listRoomType, setListRoomType] = useState([]);
  const [errorRoomType, setErrorRoomType] = useState('');
  const [errorRent, setErrorRent] = useState('');
  const [errorDeposite, setErrorDeposite] = useState('');
  const [listAreaType, setListAreaType] = useState([]);
  const [errorAreaType, setErrorAreaType] = useState('');
  const [listDietaryType, setListDietaryType] = useState([]);
  const [errorDietaryType, setErrorDietaryType] = useState('');
  const [listReligionType, setListReligionType] = useState([]);
  const [errorReligionType, setErrorReligionType] = useState('');
  //  FacilitiesModal
  const [listFacilities, setListFacilities] = useState([]);
  const [isVisibleFacilities, setIsVisibleFacilities] = useState(false);
  const [textFacilities, setTextFacilities] = useState('');
  const [errorTextFacilities, setErrorTextFacilities] = useState('');
  const [errorAddFacilities, setErrorAddFacilities] = useState('');
  //  AdvantagesModal
  const [listAdvantages, setListAdvantages] = useState([]);
  const [isVisibleAdvantages, setIsVisibleAdvantages] = useState(false);
  const [textAdvantages, setTextAdvantages] = useState('');
  const [errorTextAdvantages, setErrorTextAdvantages] = useState('');
  const [errorAddAdvantages, setErrorAddAdvantages] = useState('');
  //  NearByModal
  const [listNearBy, setListNearBy] = useState([]);
  const [isVisibleNearBy, setIsVisibleNearBy] = useState(false);
  const [textNearBy, setTextNearBy] = useState('');
  const [errorTextNearBy, setErrorTextNearBy] = useState('');
  const [errorAddNearBy, setErrorAddNearBy] = useState('');
  //  ChooseImageModal
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isVisibleChooseImage, setIsVisibleChooseImage] = useState(false);

  useEffect(() => {
    const { isFromAdd, isLive } = props.route.params;
    setIsEdit(isFromAdd);
    setIsLive(isLive);
    doGetData();
  }, []);

  const doGetData = async () => {
    const userType = await cacheData.getDataFromCachedWithKey(
      AppConstants.AsyncKeyLiterals.userType,
    );
    setIsRental(userType === 2);

    const homeDetailsItem = defaultPopupData.homeDetails;
    setListDataHome(homeDetailsItem);

    const facilitiesItem = defaultPopupData.facilities;
    setListDataFacilities(facilitiesItem);

    const advantagesItem = defaultPopupData.advantages;
    setListDataAdvantage(advantagesItem);

    const nearByItem = defaultPopupData.nearBy;
    setListDataNearBy(nearByItem);

    const selectTypeData = defaultPopupData.selectType;
    setListSelectType(selectTypeData);

    const roomTypeData = defaultPopupData.roomType;
    setListRoomType(roomTypeData);

    const areaTypeData = defaultPopupData.areaType;
    setListAreaType(areaTypeData);

    const dietaryTypeData = defaultPopupData.dietaryPreference;
    setListDietaryType(dietaryTypeData);

    const religionTypeData = defaultPopupData.religionType;
    setListReligionType(religionTypeData);
  };

  const isValid = () => {
    let validate = true;

    setErrorFirstName('');
    setErrorLastName('');
    setErrorMobileNo('');
    setErrorArea('');
    setErrorCity('');
    setErrorState('');
    setErrorHomeDetailsData('');
    setErrorFacilitiesData('');
    setErrorAdvantagesData('');
    setErrorNearByData('');
    setErrorListImages('');

    if (firstName.trim().length === 0) {
      validate = false;
      setErrorFirstName('*Please enter the first name');
    } else if (lastName.trim().length === 0) {
      validate = false;
      setErrorLastName('*Please enter the last name');
    } else if (mobileNo.trim().length !== 10) {
      validate = false;
      setErrorMobileNo('*Mobile number must have 10 numbers');
    } else if (area.trim().length === 0) {
      validate = false;
      setErrorArea('*Please enter your area!');
    } else if (city.trim().length === 0) {
      validate = false;
      setErrorCity('*Please enter your city!');
    } else if (state.trim().length === 0) {
      validate = false;
      setErrorState('*Please enter your state!');
    } else if (listDataHome.length === 0) {
      validate = false;
      setErrorHomeDetailsData('*Please add your home details!');
    } else if (listDataFacilities.length === 0) {
      validate = false;
      setErrorFacilitiesData('*Please add the facilities!');
    } else if (listDataAdvantage.length === 0) {
      validate = false;
      setErrorAdvantagesData('*Please add the advantages!');
    } else if (listDataNearBy.length === 0) {
      validate = false;
      setErrorNearByData('*Please add the near by areas!');
    } else if (listImages.length === 0) {
      validate = false;
      setErrorListImages('*Please add your home images!');
    }

    return validate;
  };

  const isValidTextFacilities = () => {
    let validate = true;

    setErrorTextFacilities('');
    setErrorAddFacilities('');

    if (textFacilities.trim().length === 0) {
      validate = false;
      setErrorTextFacilities('*Please enter the facilities');
    }

    return validate;
  };
  const isValidAddFacilities = () => {
    let validate = true;

    setErrorAddFacilities('');
    setErrorTextFacilities('');

    if (listFacilities.length === 0) {
      validate = false;
      setErrorAddFacilities('*Please add the facilities');
    }

    return validate;
  };

  const isValidTextAdvantages = () => {
    let validate = true;

    setErrorTextAdvantages('');
    setErrorAddAdvantages('');

    if (textAdvantages.trim().length === 0) {
      validate = false;
      setErrorTextAdvantages('*Please enter the advantages');
    }

    return validate;
  };
  const isValidAddAdvantages = () => {
    let validate = true;

    setErrorAddAdvantages('');
    setErrorTextAdvantages('');

    if (listAdvantages.length === 0) {
      validate = false;
      setErrorAddAdvantages('*Please add the advantages');
    }

    return validate;
  };

  const isValidTextNearBy = () => {
    let validate = true;

    setErrorTextNearBy('');
    setErrorAddNearBy('');

    if (textNearBy.trim().length === 0) {
      validate = false;
      setErrorTextNearBy('*Please enter the near by');
    }

    return validate;
  };
  const isValidAddNearBy = () => {
    let validate = true;

    setErrorAddNearBy('');
    setErrorTextNearBy('');

    if (listNearBy.length === 0) {
      validate = false;
      setErrorAddNearBy('*Please add the near by');
    }

    return validate;
  };

  const selectTypeClick = () => {
    let validate = true;

    setErrorSelectType('');
    setErrorRoomType('');
    setErrorRent('');
    setErrorDeposite('');
    setErrorAreaType('');
    setErrorDietaryType('');
    setErrorReligionType('');

    const selectSelectedItems = listSelectType.filter(item => item.isSelected);
    const roomSelectedItems = listRoomType.filter(item => item.isSelected);
    const areaSelectedItems = listAreaType.filter(item => item.isSelected);
    const dietarySelectedItems = listDietaryType.filter(
      item => item.isSelected,
    );
    const religionSelectedItems = listReligionType.filter(
      item => item.isSelected,
    );

    if (selectSelectedItems.length === 0) {
      validate = false;
      setErrorSelectType('*Please select any home type');
    } else if (roomSelectedItems.length === 0) {
      validate = false;
      setErrorRoomType('*Please select any room type');
    } else if (rent.trim().length === 0) {
      validate = false;
      setErrorRent('*Please enter the rent');
    } else if (deposite.trim().length === 0) {
      validate = false;
      setErrorDeposite('*Please enter the deposite');
    } else if (areaSelectedItems.length === 0) {
      validate = false;
      setErrorAreaType('*Please select any area type');
    } else if (dietarySelectedItems.length === 0) {
      validate = false;
      setErrorDietaryType('*Please select any dietary type');
    } else if (religionSelectedItems.length === 0) {
      validate = false;
      setErrorReligionType('*Please select any religion type');
    }

    return validate;
  };
  // ```

  const doCheckPermission = async id => {
    if (Platform.OS === 'android') {
      const permission = await doCheckCameraPermission();
      if (permission.success === true) {
        doGetCamImage(id);
      } else {
        setIsVisibleChooseImage(!isVisibleChooseImage);
      }
    } else {
    }
  };

  const doGetCamImage = id => {
    if (id === 1) {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 1,
          maxWidth: 500,
          maxHeight: 500,
          cameraType: 'back',
          saveToPhotos: false,
        },
        result => {
          setIsVisibleChooseImage(!isVisibleChooseImage);
          if (result.assets && result.assets.length > 0) {
            if (isEditProfile) {
              setMainImage(result.assets[0].uri);
            } else {
              const imageList = [...listImages];
              imageList.push({
                id: listImages.length + 1,
                image: result.assets[0].uri,
                imageType: result.assets[0].type,
              });
              setListImages(imageList);
            }
          }
        },
      ).catch(err => {
        setIsVisibleChooseImage(!isVisibleChooseImage);
      });
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          maxWidth: 500,
          maxHeight: 500,
          cameraType: 'back',
          saveToPhotos: false,
        },
        result => {
          setIsVisibleChooseImage(!isVisibleChooseImage);
          if (result.assets && result.assets.length > 0) {
            if (isEditProfile) {
              setMainImage(result.assets[0].uri);
            } else {
              const imageList = [...listImages];
              imageList.push({
                id: listImages.length + 1,
                image: result.assets[0].uri,
                imageType: result.assets[0].type,
              });
              setListImages(imageList);
            }
          }
        },
      ).catch(err => {
        setIsVisibleChooseImage(!isVisibleChooseImage);
      });
    }
  };

  const doCheckCameraPermission = async () => {
    let data;
    const checkStatus = await checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
    let successCountCheck = 0;
    if (
      checkStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED ||
      checkStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.LIMITED
    ) {
      successCountCheck = successCountCheck + 1;
    }
    if (
      checkStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
      RESULTS.GRANTED ||
      checkStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.LIMITED
    ) {
      successCountCheck = successCountCheck + 1;
    }
    if (
      checkStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
      RESULTS.GRANTED ||
      checkStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
      RESULTS.LIMITED
    ) {
      successCountCheck = successCountCheck + 1;
    }

    if (successCountCheck === 3) {
      data = { success: true };
    } else {
      const getStatus = await requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);
      console.log('getStatus :: ', getStatus);

      let suucessCountGet = 0;
      if (
        getStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED ||
        getStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.LIMITED
      ) {
        suucessCountGet = suucessCountGet + 1;
      }
      if (
        getStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
        RESULTS.GRANTED ||
        getStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.LIMITED
      ) {
        suucessCountGet = suucessCountGet + 1;
      }
      if (
        getStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
        RESULTS.GRANTED ||
        getStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
        RESULTS.LIMITED
      ) {
        suucessCountGet = suucessCountGet + 1;
      }

      if (suucessCountGet === 3) {
        data = { success: true };
      } else {
        data = { success: false };
      }
    }
    return data;
  };

  const doAddProperty = async () => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    if (isConnected) {
      try {
        const propertyData = {
          mainImage: mainImage,
          firstName: firstName,
          lastName: lastName,
          phone_number: mobileNo,
          isLive: isLive,
          area: area,
          city: city,
          state: state,
          home_details: listDataHome,
          facilities: listDataFacilities,
          advantages: listDataAdvantage,
          near_by: listDataNearBy,
          images: listImages,
        };

        const response = await property(propertyData);
        setLoading(false);

        if (response && response.status) {
          console.log('Property added successfully:', response.data);
          RNToasty.Show({ title: 'Property added successfully' });
          setIsEdit(false);
        } else {
          const message = response.message;
          RNToasty.Show({title: message});
          if (message === 'Invalid Token') {
            doLogout()
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({title: message});
        if (message === 'Invalid Token') {
          doLogout()
        }
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
      routes: [{ name: 'SplashScreen' }]
    })
  }

  return (
    <SafeAreaView style={styles.viewMainContainer}>
      <View style={styles.container}>
        {isRental === true ? (
          <Header
            title={'RentEase'}
            isRental={isRental}
            showIcon={0}
            ProfileIcon={true}
            onPress={() => {
              props.navigation.navigate('ProfilePage');
            }}
          />
        ) : (
          <Header
            title={'RentEase'}
            isRental={isRental}
            showIcon={3}
            ProfileIcon={true}
            isEdit={isEdit}
            DeleteIcon={true}
            onDelete={() => {
              setIsVisibleDelete(!isVisibleDelete);
            }}
            onChange={() => {
              setIsEdit(!isEdit);
            }}
            onPress={() => {
              props.navigation.navigate('ProfilePage');
            }}
          />
        )}

        <KeyboardAwareScrollView
          style={styles.flex1}
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.viewMain}>
            <ImageOfHome
              onPress={() => {
                setIsEditProfile(true);
                setIsVisibleChooseImage(true);
              }}
              isLive={isLive}
              image={
                mainImage
                  ? mainImage
                  : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              isEdit={isEdit}
            />
            {isEdit === true ? (
              <View style={styles.viewRow}>
                <View style={styles.viewMR}>
                  <InputText
                    title={'First Name'}
                    placeholder={'Enter your first name'}
                    value={firstName}
                    onChangeText={setFirstName}
                    error={errorFirstName}
                  />
                </View>
                <View style={styles.viewML}>
                  <InputText
                    title={'Last Name'}
                    placeholder={'Enter your last name'}
                    value={lastName}
                    onChangeText={setLastName}
                    error={errorLastName}
                  />
                </View>
              </View>
            ) : (
              <UserInfo
                image={Theme.icons.UserIcon}
                title={'Ashish Pipaliya'}
                styleText={styles.textUserInfoStyle}
                viewMain={styles.viewUserInfo}
              />
            )}
            {isEdit === true ? (
              <InputText
                title={'Mobile No'}
                placeholder={'Enter your mobile no'}
                value={mobileNo}
                onChangeText={setMobileNo}
                error={errorMobileNo}
              />
            ) : (
              <UserInfo
                image={Theme.icons.MobileIcon}
                title={'+91 63543 48235'}
                styleText={styles.textUserInfoStyle}
                viewMain={styles.viewUserInfo}
              />
            )}
            {isEdit === true ? (
              <View style={styles.viewLive}>
                <Text style={styles.textLive}>{'Live'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsOnPress(!isOnPress);
                  }}>
                  <View
                    style={[
                      styles.viewSwitchButton,
                      {
                        backgroundColor: isOnPress
                          ? Theme.colors.bgColor1
                          : Theme.colors.bgColor12,
                        paddingRight: isOnPress
                          ? Theme.responsiveSize.size04
                          : Theme.responsiveSize.size18,
                        paddingLeft: isOnPress
                          ? Theme.responsiveSize.size18
                          : Theme.responsiveSize.size04,
                      },
                    ]}>
                    <View style={[styles.switchButton]} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}

            {isEdit === true ? (
              <CustomSelect
                title={'Your Location'}
                touchableTitle={'Detect Location'}
                viewMain={{
                  marginHorizontal: 0,
                }}
                onPress={() => { }}
              />
            ) : null}
            {isEdit === true ? (
              <View>
                <InputText
                  title={'Area'}
                  placeholder={'Enter your area'}
                  value={area}
                  onChangeText={setArea}
                  error={errorArea}
                />
                <View style={styles.viewRow}>
                  <View style={styles.viewMR}>
                    <InputText
                      title={'City'}
                      placeholder={'Enter your city'}
                      value={city}
                      onChangeText={setCity}
                      error={errorCity}
                    />
                  </View>
                  <View style={styles.viewML}>
                    <InputText
                      title={'State'}
                      placeholder={'Enter your state'}
                      value={state}
                      onChangeText={setState}
                      error={errorState}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <UserInfo
                image={Theme.icons.LocationIcon}
                title={
                  'B-101, ShantiKunj App., Akhand-Anand Soc., Dabholi Road, Katargam, Surat.'
                }
                styleText={styles.textUserInfoStyle}
                viewMain={styles.viewUserInfo}
              />
            )}

            <HomeDetails
              title={'Home Details'}
              ListData={listDataHome}
              isOwner={!isRental && isEdit}
              style={styles.viewHomeDetails}
              onPress={() => {
                setSelectTypeList(true);
              }}
              error={errorHomeDetailsData}
            />
            <HomeDetails
              title={'Facilities'}
              ListData={listDataFacilities}
              isOwner={!isRental && isEdit}
              style={styles.viewHomeDetails}
              onPress={() => {
                setIsVisibleFacilities(true);
              }}
              error={errorFacilitiesData}
            />
            <HomeDetails
              title={'Advantages'}
              ListData={listDataAdvantage}
              isOwner={!isRental && isEdit}
              style={styles.viewHomeDetails}
              onPress={() => {
                setIsVisibleAdvantages(true);
              }}
              error={errorAdvantagesData}
            />
            <HomeDetails
              title={'Near By'}
              ListData={listDataNearBy}
              isOwner={!isRental && isEdit}
              style={styles.viewHomeDetails}
              onPress={() => {
                setIsVisibleNearBy(true);
              }}
              error={errorNearByData}
            />
          </View>
          <HomeImage
            title={'Images'}
            ListData={listImages}
            isEdit={isEdit}
            error={errorListImages}
            onPress={() => {
              setIsEditProfile(false);
              setIsVisibleChooseImage(true);
            }}
            onPressDelete={_index => {
              const imageList = [...listImages];
              const newList = [];
              imageList.map((item, index) => {
                if (index !== _index) {
                  newList.push(item);
                }
              });
              setListImages(newList);
            }}
          />
          {isEdit === true ? (
            <View style={styles.viewBottom}>
              <Button
                viewMain={styles.buttonSave}
                textStyle={{ fontFamily: Theme.fonts.latoBold }}
                title={'save'}
                onPress={() => {
                  if (isValid()) {
                    doAddProperty()
                  }
                }}
              />
              <Button
                viewMain={styles.buttonCancle}
                viewStyle={{ backgroundColor: Theme.colors.bgColor9 }}
                textStyle={{
                  fontFamily: Theme.fonts.latoBold,
                  color: Theme.colors.textColor4,
                }}
                title={'cancel'}
                onPress={() => {
                  setIsEdit(true);
                }}
              />
            </View>
          ) : null}
        </KeyboardAwareScrollView>
        {isEdit === true ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={selectTypeList}
            onRequestClose={() => {
              setSelectTypeList(!selectTypeList);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.centeredViewOther}>
                <View style={styles.modalView}>
                  <View style={styles.viewRow}>
                    <Text style={styles.modalText}>{'Home Details'}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectTypeList(!selectTypeList);
                      }}>
                      <Image
                        style={styles.closeButton}
                        source={Theme.icons.Close}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.divider} />
                  <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <SelectListType
                      title={'Select'}
                      ListData={listSelectType}
                      onItemClick={mainId => {
                        const newList = [...listSelectType];
                        newList.map(item => {
                          if (item.id === mainId) {
                            item.isSelected = !item.isSelected;
                            setErrorSelectType('');
                          } else {
                            item.isSelected = false;
                          }
                          if (item.isSelected) {
                            if (
                              item.title === 'Recidencial' ||
                              item.title === 'Apartment' ||
                              item.title === 'Farm House'
                            ) {
                              setIsRoomDataVisible(true);
                            } else {
                              setIsRoomDataVisible(false);
                            }
                          }
                        });
                        setListSelectType(newList);
                      }}
                      error={errorSelectType}
                    />
                    {isRoomDataVisible ? (
                      <SelectListType
                        title={'Room'}
                        ListData={listRoomType}
                        roomData={isRoomDataVisible}
                        showRentData={true}
                        onItemClick={mainId => {
                          const newList = [...listRoomType];
                          newList.map(item => {
                            if (item.id === mainId) {
                              item.isSelected = !item.isSelected;
                              setErrorRoomType('');
                            } else {
                              item.isSelected = false;
                            }
                          });
                          setListRoomType(newList);
                        }}
                        error={errorRoomType}
                        valueRent={rent}
                        onChangeTextRent={setRent}
                        errorRent={errorRent}
                        valueDeposite={deposite}
                        onChangeTextDeposite={setDeposite}
                        errorDeposite={errorDeposite}
                      />
                    ) : null}

                    <SelectListType
                      title={'Area Type'}
                      ListData={listAreaType}
                      onItemClick={mainId => {
                        const newList = [...listAreaType];
                        newList.map(item => {
                          if (item.id === mainId) {
                            item.isSelected = !item.isSelected;
                            setErrorAreaType('');
                          } else {
                            item.isSelected = false;
                          }
                        });
                        setListAreaType(newList);
                      }}
                      error={errorAreaType}
                    />
                    <SelectListType
                      title={'Dietary Preference'}
                      ListData={listDietaryType}
                      onItemClick={mainId => {
                        const newList = [...listDietaryType];
                        newList.map(item => {
                          if (item.id === mainId) {
                            item.isSelected = !item.isSelected;
                            setErrorDietaryType('');
                          } else {
                            item.isSelected = false;
                          }
                        });
                        setListDietaryType(newList);
                      }}
                      error={errorDietaryType}
                    />
                    <SelectListType
                      title={'Religion'}
                      ListData={listReligionType}
                      onItemClick={mainId => {
                        const newList = [...listReligionType];
                        newList.map(item => {
                          if (item.id === mainId) {
                            item.isSelected = !item.isSelected;
                            setErrorReligionType('');
                          } else {
                            item.isSelected = false;
                          }
                        });
                        setListReligionType(newList);
                      }}
                      error={errorReligionType}
                    />
                  </KeyboardAwareScrollView>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Button
                      title={'DONE'}
                      viewStyle={styles.viewDoneButton}
                      textStyle={styles.textDoneButton}
                      onPress={() => {
                        if (selectTypeClick()) {
                          setSelectTypeList(!selectTypeList);
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}

        {/* FacilitiesModal */}
        {isEdit === true ? (
          <View>
            <CustomMenuFacilities
              title={'Facilities'}
              visible={isVisibleFacilities}
              listData={listFacilities}
              value={textFacilities}
              error={errorTextFacilities}
              errorDone={errorAddFacilities}
              onChangeText={text => {
                setTextFacilities(text);
              }}
              onClearText={() => {
                setTextFacilities('');
              }}
              onClickAddData={() => {
                if (isValidTextFacilities()) {
                  const newList = [...listFacilities];
                  newList.push({
                    id: newList.length + 1,
                    title: textFacilities,
                  });
                  setListFacilities(newList);
                  setTextFacilities('');
                }
              }}
              onItemDelete={index => {
                const newList = [...listFacilities];
                const newFinalList = [];
                newList.map((_item, _index) => {
                  if (_index !== index) {
                    newFinalList.push(_item);
                  }
                });
                setListFacilities(newFinalList);
              }}
              onClose={() => {
                setIsVisibleFacilities(!isVisibleFacilities);
              }}
              onDone={() => {
                if (isValidAddFacilities()) {
                  setIsVisibleFacilities(!isVisibleFacilities);
                }
              }}
            />
          </View>
        ) : null}

        {/* AdvantagesModal */}
        {isEdit === true ? (
          <CustomMenuFacilities
            title={'Advantages'}
            visible={isVisibleAdvantages}
            listData={listAdvantages}
            value={textAdvantages}
            error={errorTextAdvantages}
            errorDone={errorAddAdvantages}
            onChangeText={text => {
              setTextAdvantages(text);
            }}
            onClearText={() => {
              setTextAdvantages('');
            }}
            onClickAddData={() => {
              if (isValidTextAdvantages()) {
                const newList = [...listAdvantages];
                newList.push({
                  id: newList.length + 1,
                  title: textAdvantages,
                });
                setListAdvantages(newList);
                setTextAdvantages('');
              }
            }}
            onItemDelete={index => {
              const newList = [...listAdvantages];
              const newFinalList = [];
              newList.map((_item, _index) => {
                if (_index !== index) {
                  newFinalList.push(_item);
                }
              });
              setListAdvantages(newFinalList);
            }}
            onClose={() => {
              setIsVisibleAdvantages(!isVisibleAdvantages);
            }}
            onDone={() => {
              if (isValidAddAdvantages()) {
                setIsVisibleAdvantages(!isVisibleAdvantages);
              }
            }}
          />
        ) : null}

        {/* NearByModal */}
        {isEdit === true ? (
          <CustomMenuFacilities
            title={'Near By'}
            visible={isVisibleNearBy}
            listData={listNearBy}
            value={textNearBy}
            error={errorTextNearBy}
            errorDone={errorAddNearBy}
            onChangeText={text => {
              setTextNearBy(text);
            }}
            onClearText={() => {
              setTextNearBy('');
            }}
            onClickAddData={() => {
              if (isValidTextNearBy()) {
                const newList = [...listNearBy];
                newList.push({
                  id: newList.length + 1,
                  title: textNearBy,
                });
                setListNearBy(newList);
                setTextNearBy('');
              }
            }}
            onItemDelete={index => {
              const newList = [...listNearBy];
              const newFinalList = [];
              newList.map((_item, _index) => {
                if (_index !== index) {
                  newFinalList.push(_item);
                }
              });
              setListNearBy(newFinalList);
            }}
            onClose={() => {
              setIsVisibleNearBy(!isVisibleNearBy);
            }}
            onDone={() => {
              if (isValidAddNearBy()) {
                setIsVisibleNearBy(!isVisibleNearBy);
              }
            }}
          />
        ) : null}

        {/* ChooseImageModal */}
        <CustomMenu
          visible={isVisibleChooseImage}
          isChooseImage={true}
          onCancle={() => {
            setIsVisibleChooseImage(!isVisibleChooseImage);
          }}
          onClickCamera={() => {
            doCheckPermission(1);
          }}
          onClickGallery={() => {
            doCheckPermission(2);
          }}
          title={'Choose Image Option'}
          CameraTitle={'Choose from Camera'}
          GalleryTitle={'Choose from gallery'}
          CancleTitle={'Cancel'}
        />

        {isEdit === true ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisibleDelete}
            onRequestClose={() => {
              setIsVisibleDelete(!isVisibleDelete);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.centeredViewOther}>
                <View style={styles.modalView}>
                  <Text style={styles.textMain}>
                    {'Are You Sure You Want To Delete The Property?'}
                  </Text>
                  <View style={[styles.viewRow, { justifyContent: 'center' }]}>
                    <Button
                      title={'CANCEL'}
                      viewMain={styles.viewTouchable}
                      viewStyle={styles.viewDeleteButton}
                      textStyle={styles.textDoneButton}
                      onPress={() => {
                        setIsVisibleDelete(!isVisibleDelete);
                      }}
                    />
                    <Button
                      title={'DELETE'}
                      viewMain={styles.viewTouchable}
                      viewStyle={[
                        styles.viewDeleteButton,
                        { backgroundColor: Theme.colors.bgColor13 },
                      ]}
                      textStyle={styles.textDoneButton}
                      onPress={() => {
                        setIsVisibleDelete(!isVisibleDelete);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default DetailsScreen;
