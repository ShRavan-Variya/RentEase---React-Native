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
import { CustomMenu, CustomMenuFacilities, SelectListType, } from '../../../components/CustomMenu';
import { Button } from '../../../components/Button';
import defaultPopupData from '../../../defaultData/defaultPopupData';
import { PERMISSIONS, RESULTS, checkMultiple, } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native';
import { AppConstants, cacheData } from '../../../module';
import { isNetworkAvailable } from '../../../api';
import { Loader } from '../../../components/Loader';
import { RNToasty } from 'react-native-toasty';
import { getPropertyDetails, property, putPropertyList, uploadImages } from '../../../services/auth';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../../api/api';

const DetailsScreen = props => {
  const navigation = useNavigation();
  //All States
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [listDataFacilities, setListDataFacilities] = useState([]);
  const [listDataAdvantage, setListDataAdvantage] = useState([]);
  const [listDataNearBy, setListDataNearBy] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  //Main States
  const [mainImage, setMainImage] = useState();
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [address_line1, setAddress_line1] = useState('');
  const [address_line2, setAddress_line2] = useState('');
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
  const [listImages, setListImages] = useState([]);
  //Error States
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNo, setErrorMobileNo] = useState('');
  const [errorAddress_line1, setErrorAddress_line1] = useState('');
  const [errorAddress_line2, setErrorAddress_line2] = useState('');
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
    const { id, isFromAdd, userId } = props.route.params;
    setItemId(id);
    doGetData();
    if (isFromAdd) {
      setIsEdit(true);
    } else if (id !== undefined && id !== null) {
      doGetItemData(id);
    } 
    
  }, []);

  const doGetData = async () => {
    const userType = await cacheData.getDataFromCachedWithKey(
      AppConstants.AsyncKeyLiterals.userType,
    );
    setIsRental(userType === 2);

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

  const doGetItemData = async id => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    if (isConnected) {
      try {
        const response = await getPropertyDetails(id);
        setLoading(false);
        if (response && response.status) {
          const propertyData = response.data;

          console.log('====================================');
          console.log('propertyData ::; ', JSON.stringify(propertyData));
          console.log('====================================');

          setMainImage({ image: `${API_BASE_URL}uploads/${propertyData.main_image}`, });
          setUserName(`${propertyData.firstName} ${propertyData.lastName}`);
          setMobileNo(`${propertyData.phone_number}`);
          setFullAddress(`${propertyData.address_line1} ${propertyData.address_line2} ${propertyData.area} ${propertyData.city} ${propertyData.state}`,);
          setSelectedItems([
            { title: 'Property Type', subTitle: propertyData.home_details.property_type, },
            { title: 'Room Type', subTitle: propertyData.home_details.room_type },
            { title: 'Rent', subTitle: propertyData.home_details.rent_amount.toString(), },
            { title: 'Deposite', subTitle: propertyData.home_details.deposite_amount.toString(), },
            { title: 'Area Type', subTitle: propertyData.home_details.area_type },
            { title: 'Dietry Type', subTitle: propertyData.home_details.diet_type, },
            { title: 'Religion Type', subTitle: propertyData.home_details.religion, },
          ]);
          setListDataFacilities(propertyData.facilities.map(title => ({ title })),);
          setListDataAdvantage(propertyData.advantages.map(title => ({ title })));
          setListDataNearBy(propertyData.near_by.map(title => ({ title })));
          setListImages(propertyData.images.map(images => `${images}`));


          setOwnerId(propertyData.owner_id);
          setPropertyId(propertyData.property_id)
        } else {
          setLoading(false);
          const message = response.message;
          RNToasty.Show({ title: message });
          if (message === 'Invalid token') {
            doLogout();
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({ title: message });
        if (message === 'Invalid token') {
          doLogout();
        }
      }
    } else {
      setLoading(false);
      RNToasty.Show({ title: 'No internet connection available!' });
    }
  };

  const doUpdateImages = async () => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    if (isConnected) {
      try {


        const imageList = []
        imageList.push({
          id: 1,
          image: '',
          imageType: 'mainImage'
        })
        listImages.map((item, index) => {
          imageList.push({
            id: index + 2,
            image: '',
            imageType: 'subImage'
          })
        })

        const response = await putPropertyList(imageList);
        setLoading(false);
        if (response && response.status) {
          
          const mainImageFinal = '';
          const imageListFinal = [];
          doUpdateProperty(imageListFinal, mainImageFinal)
        } else {
          setLoading(false);
          const message = response.message;
          RNToasty.Show({ title: message });
          if (message === 'Invalid token') {
            doLogout();
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({ title: message });
        if (message === 'Invalid token') {
          doLogout();
        }
      }
    } else {
      setLoading(false);
      RNToasty.Show({ title: 'No internet connection available!' });
    }

    
  }

  const doUpdateProperty = async (responseImageList, mainImage) => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    if (isConnected) {
      try {

        const propertyData = {
          main_image: mainImage,
          firstName: firstName,
          lastName: lastName,
          phone_number: mobileNo,
          isLive: isLive,
          address_line1: address_line1,
          address_line2: address_line2,
          area: area,
          city: city,
          state: state,
          home_details: transformedData,
          facilities: facility,
          advantages: advantages,
          near_by: nearBy,
          images: responseImageList,
        };

        const response = await putPropertyList(propertyId, ownerId, propertyData);
        setLoading(false);
        if (response && response.status) {
          const propertyData = response.data;

          setMainImage({ image: `${API_BASE_URL}uploads/${propertyData.main_image}`, });
          setUserName(`${propertyData.firstName} ${propertyData.lastName}`);
          setMobileNo(`${propertyData.phone_number}`);
          setFullAddress(`${propertyData.address_line1} ${propertyData.address_line2} ${propertyData.area} ${propertyData.city} ${propertyData.state}`,);
          setSelectedItems([
            { title: 'Property Type', subTitle: propertyData.home_details.property_type, },
            { title: 'Room Type', subTitle: propertyData.home_details.room_type },
            { title: 'Rent', subTitle: propertyData.home_details.rent_amount.toString(), },
            { title: 'Deposite', subTitle: propertyData.home_details.deposite_amount.toString(), },
            { title: 'Area Type', subTitle: propertyData.home_details.area_type },
            { title: 'Dietry Type', subTitle: propertyData.home_details.diet_type, },
            { title: 'Religion Type', subTitle: propertyData.home_details.religion, },
          ]);
          setListDataFacilities(propertyData.facilities.map(title => ({ title })),);
          setListDataAdvantage(propertyData.advantages.map(title => ({ title })));
          setListDataNearBy(propertyData.near_by.map(title => ({ title })));
          setListImages(propertyData.images.map(images => `${images}`));
        } else {
          setLoading(false);
          const message = response.message;
          RNToasty.Show({ title: message });
          if (message === 'Invalid token') {
            doLogout();
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({ title: message });
        if (message === 'Invalid token') {
          doLogout();
        }
      }
    } else {
      setLoading(false);
      RNToasty.Show({ title: 'No internet connection available!' });
    }
  };

  const isValid = () => {
    let validate = true;

    setErrorFirstName('');
    setErrorLastName('');
    setErrorMobileNo('');
    setErrorAddress_line1('');
    setErrorAddress_line2('');
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
    } else if (address_line1.trim().length === 0) {
      validate = false;
      setErrorAddress_line1('*Please enter the address_line1!');
    } else if (address_line1.trim().length === 0) {
      validate = false;
      setErrorAddress_line2('*Please enter the address_line2!');
    } else if (area.trim().length === 0) {
      validate = false;
      setErrorArea('*Please enter your area!');
    } else if (city.trim().length === 0) {
      validate = false;
      setErrorCity('*Please enter your city!');
    } else if (state.trim().length === 0) {
      validate = false;
      setErrorState('*Please enter your state!');
    } else if (selectedItems.length === 0) {
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
    } else if (isRoomDataVisible && roomSelectedItems.length === 0) {
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

  const newSelectedData = () => {
    const selectSelectedItems = listSelectType.filter(item => item.isSelected);
    const roomSelectedItems = listRoomType.filter(item => item.isSelected);
    const areaSelectedItems = listAreaType.filter(item => item.isSelected);
    const dietarySelectedItems = listDietaryType.filter(item => item.isSelected,);
    const religionSelectedItems = listReligionType.filter(item => item.isSelected,);

    const selectedData = [];
    selectedData.push({ id: 1, title: 'Property Type', subTitle: selectSelectedItems[0].title, });
    if (roomSelectedItems.length > 0) {
      selectedData.push({ id: 2, title: 'Room Area', subTitle: roomSelectedItems[0].title, });
    }
    selectedData.push(
      { id: 3, title: 'Rent', subTitle: rent },
      { id: 4, title: 'Deposite', subTitle: deposite },
      { id: 5, title: 'Area Type', subTitle: areaSelectedItems[0].title },
      { id: 6, title: 'Dietry Type', subTitle: dietarySelectedItems[0].title },
      { id: 7, title: 'Religion Type', subTitle: religionSelectedItems[0].title },
    );
    setSelectedItems(selectedData);
    setSelectTypeList(!selectTypeList);
  };

  // ```

  const doCheckPermission = async id => {
      const permission = await doCheckCameraPermission();
      if (permission.success === true) {
        doGetCamImage(id);
      } else {
        setIsVisibleChooseImage(!isVisibleChooseImage);
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
              const image = {
                image: result.assets[0].uri,
                imageType: result.assets[0].type,
              };
              setMainImage(image);
            } else {
              const imageList = [...listImages];
              imageList.push({
                id: listImages.length + 1,
                image: result.assets[0].uri,
                imageType: result.assets[0].type,
                isLocal: true,
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
              const image = {
                image: result.assets[0].uri,
                imageType: result.assets[0].type,
              };
              setMainImage(image);
            } else {
              const imageList = [...listImages];
              imageList.push({
                id: listImages.length + 1,
                image: result.assets[0].uri,
                imageType: result.assets[0].type,
                isLocal: true,
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

  // const doCheckCameraPermission = async () => {
  //   let data;
  //   const checkStatus = await checkMultiple([
  //     PERMISSIONS.ANDROID.CAMERA,
  //     PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  //     PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  //   ]);
  //   let successCountCheck = 0;
  //   if (
  //     checkStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED ||
  //     checkStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.LIMITED
  //   ) {
  //     successCountCheck = successCountCheck + 1;
  //   }
  //   if (
  //     checkStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
  //     RESULTS.GRANTED ||
  //     checkStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.LIMITED
  //   ) {
  //     successCountCheck = successCountCheck + 1;
  //   }
  //   if (
  //     checkStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
  //     RESULTS.GRANTED ||
  //     checkStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
  //     RESULTS.LIMITED
  //   ) {
  //     successCountCheck = successCountCheck + 1;
  //   }

  //   if (successCountCheck === 3) {
  //     data = { success: true };
  //   } else {
  //     const getStatus = await requestMultiple([
  //       PERMISSIONS.ANDROID.CAMERA,
  //       PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  //       PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  //     ]);
  //     console.log('getStatus :: ', getStatus);

  //     let suucessCountGet = 0;
  //     if (
  //       getStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED ||
  //       getStatus[PERMISSIONS.ANDROID.CAMERA] === RESULTS.LIMITED
  //     ) {
  //       suucessCountGet = suucessCountGet + 1;
  //     }
  //     if (
  //       getStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
  //       RESULTS.GRANTED ||
  //       getStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.LIMITED
  //     ) {
  //       suucessCountGet = suucessCountGet + 1;
  //     }
  //     if (
  //       getStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
  //       RESULTS.GRANTED ||
  //       getStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
  //       RESULTS.LIMITED
  //     ) {
  //       suucessCountGet = suucessCountGet + 1;
  //     }

  //     if (suucessCountGet === 3) {
  //       data = { success: true };
  //     } else {
  //       data = { success: false };
  //     }
  //   }
  //   return data;
  // };

 const doCheckCameraPermission = async item => {
    let finalData = {success:true};
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
  
 const permissionRequest = async item => {
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

  const doAddImages = async () => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    if (isConnected) {
      try {
        const formData = new FormData();
        listImages.forEach((image, index) => {
          formData.append('images', {
            uri: image.image,
            type: image.imageType,
            name: `image_${index}.jpg`,
          });
        });

        const tokenTitle = AppConstants.AsyncKeyLiterals.token;
        const token = await cacheData.getDataFromCachedWithKey(tokenTitle);
        const _config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          timeout: 6000,
        };

        const response = await uploadImages(_config, formData);

        if (response && response.status) {
          const responseImageList = response.data;
          const finalImageList = [];
          responseImageList.forEach(image => {
            finalImageList.push(image.filename);
          });
          doAddMainImage(finalImageList);
        } else {
          setLoading(false);
          const message = response.message;
          RNToasty.Show({ title: message });
          if (message === 'Invalid token') {
            doLogout();
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({ title: message });
        if (message === 'Invalid token') {
          doLogout();
        }
      }
    } else {
      setLoading(false);
      RNToasty.Show({ title: 'No internet connection available!' });
    }
  };

  const doAddMainImage = async finalImageList => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    if (isConnected) {
      try {
        if (!mainImage) {
          setLoading(false);
          RNToasty.Show({ title: 'Main image is missing!' });
          return;
        }
        const formData = new FormData();
        formData.append('images', {
          uri: mainImage?.image,
          type: mainImage?.imageType,
          name: 'image_.jpg',
        });

        const tokenTitle = AppConstants.AsyncKeyLiterals.token;
        const token = await cacheData.getDataFromCachedWithKey(tokenTitle);
        const _config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          timeout: 6000,
        };

        const response = await uploadImages(_config, formData);

        if (response && response.status) {
          const responseImageList = response.data;
          let mainImage = '';
          responseImageList.forEach(image => {
            mainImage = image.filename;
          });
          setSelectedImage(mainImage);
          doAddProperty(finalImageList, mainImage);
        } else {
          setLoading(false);
          const message = response.message;
          RNToasty.Show({ title: message });
          if (message === 'Invalid token') {
            doLogout();
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({ title: message });
        if (message === 'Invalid token') {
          doLogout();
        }
      }
    } else {
      setLoading(false);
      RNToasty.Show({ title: 'No internet connection available!' });
    }
  };

  const doAddProperty = async (responseImageList, mainImage) => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);

    const facility = listDataFacilities.map(item => item.title);
    const advantages = listDataAdvantage.map(item => item.title);
    const nearBy = listDataNearBy.map(item => item.title);

    const titleToKeyMap = {
      'Property Type': 'property_type',
      'Room Area': 'room_type',
      Rent: 'rent_amount',
      Deposite: 'deposite_amount',
      'Area Type': 'area_type',
      'Dietry Type': 'diet_type',
      'Religion Type': 'religion',
    };

    const transformedData = selectedItems.reduce((acc, curr) => {
      const key = titleToKeyMap[curr.title];
      if (key) {
        acc[key] = curr.subTitle;
      }
      return acc;
    }, {});

    if (isConnected) {
      try {
        const propertyData = {
          main_image: mainImage,
          firstName: firstName,
          lastName: lastName,
          phone_number: mobileNo,
          isLive: isLive,
          address_line1: address_line1,
          address_line2: address_line2,
          area: area,
          city: city,
          state: state,
          home_details: transformedData,
          facilities: facility,
          advantages: advantages,
          near_by: nearBy,
          images: responseImageList,
        };

        const response = await property(propertyData);
        setLoading(false);
        if (response && response.status) {
          setIsEdit(false);
          console.log('Property added successfully:');
          RNToasty.Show({ title: 'Property added successfully' });
        } else {
          const message = response.message;
          RNToasty.Show({ title: message });
          if (message === 'Invalid token') {
            doLogout();
          }
        }
      } catch (error) {
        setLoading(false);
        const message = error.message;
        RNToasty.Show({ title: message });
        if (message === 'Invalid token') {
          doLogout();
        }
      }
    } else {
      setLoading(false);
      RNToasty.Show({ title: 'No internet connection available!' });
    }
  };

  // const doUpdateProperty = async (id, userId) => {
  //   const isConnected = await isNetworkAvailable();
  //   setLoading(true);
  //   if (isConnected) {
  //     try {
  //       const response = await putPropertyList(id, userId);
  //       console.log('====================================');
  //       console.log('update response::', JSON.stringify(response));
  //       console.log('====================================');
  //       setLoading(false);
  //       if (response && response.status) {
  //         setIsEdit(false);
  //         console.log('Property updated successfully:');
  //         RNToasty.Show({ title: 'Property updated successfully' });
  //       } else {
  //         setLoading(false);
  //         const message = response.message;
  //         console.log('====================================');
  //         console.log('update message::', JSON.stringify(message));
  //         console.log('====================================');
  //         RNToasty.Show({ title: message });
  //         if (message === 'Invalid token') {
  //           doLogout();
  //         }
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       const message = error.message;
  //       console.log('====================================');
  //       console.log('update error::', JSON.stringify(error));
  //       console.log('====================================');
  //       RNToasty.Show({ title: message });
  //       if (message === 'Invalid token') {
  //         doLogout();
  //       }
  //     }
  //   } else {
  //     setLoading(false);
  //     RNToasty.Show({ title: 'No internet connection available!' });
  //   }
  // };

  const doLogout = () => {
    const appData = AppConstants.AsyncKeyLiterals;
    cacheData.removeDataFromCachedWithKey(appData.isLoggedIn);
    cacheData.removeDataFromCachedWithKey(appData.userData);
    cacheData.removeDataFromCachedWithKey(appData.loginUserId);
    cacheData.removeDataFromCachedWithKey(appData.token);
    cacheData.removeDataFromCachedWithKey(appData.userType);

    props.navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

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
                mainImage?.image
                  ? mainImage?.image
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
                title={userName}
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
                title={`+91 ${mobileNo}`}
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
                  title={'Address Line1'}
                  placeholder={'Enter your addres'}
                  value={address_line1}
                  onChangeText={setAddress_line1}
                  error={errorAddress_line1}
                />
                <InputText
                  title={'Address Line2'}
                  placeholder={'Enter your address'}
                  value={address_line2}
                  onChangeText={setAddress_line2}
                  error={errorAddress_line2}
                />
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
                title={fullAddress}
                styleText={styles.textUserInfoStyle}
                viewMain={styles.viewUserInfo}
              />
            )}

            <HomeDetails
              title={'Home Details'}
              ListData={selectedItems}
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
                    if (isEdit) {

                      doUpdateImages();
                    } else {
                    doAddImages();
                    }
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

                              const newList = [...listRoomType];
                              newList.map(item => (item.isSelected = false));
                              setListRoomType(newList);
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
                      />
                    ) : null}
                    <View style={styles.showRentData}>
                      <InputText
                        title={'Rent'}
                        placeholder={'Enter the rent'}
                        value={rent}
                        keyboardType={'number-pad'}
                        onChangeText={value => setRent(value)}
                        error={errorRent}
                      />
                      <InputText
                        title={'Deposite'}
                        placeholder={'Enter the deposite'}
                        value={deposite}
                        keyboardType={'number-pad'}
                        onChangeText={value => setDeposite(value)}
                        error={errorDeposite}
                      />
                    </View>
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
                          newSelectedData();
                          // console.log('====================================');
                          // console.log('Selected data:', selectedData);
                          // console.log('====================================');
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
                  setListDataFacilities(listFacilities);
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
                setListDataAdvantage(listAdvantages);
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
                setListDataNearBy(listNearBy);
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
