import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Slider from 'rn-range-slider';
import Thumb from '../../../components/slider/Thumb';
import Rail from '../../../components/slider/Rail';
import RailSelected from '../../../components/slider/RailSelected';
import Notch from '../../../components/slider/Notch';
import Label from '../../../components/slider/Label';
import InputText from '../../../components/InputText/InputText';
import {Button} from '../../../components/Button';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import RadioGroup from '../../../components/RadioButton/RadioGroup';
import {CustomMenu, SelectListType} from '../../../components/CustomMenu';
import {Header} from '../../../components/Header';
import defaultPopupData from '../../../defaultData/defaultPopupData';
import { Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConstants } from '../../../module';
import { getDataFromCachedWithKey, saveDataToCachedWithKey } from '../../../module/CacheData';

const PreferenceScreen = props => {
  //All States
  //Main States
  const [isFromDashboard, setIsFromDashboard] = useState(false);
  const [userData, setUserData] = useState(null);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');
  const [listData, setListData] = useState([]);
  const [listPreferenceData, setListPreferenceData] = useState([]);
  //Error States
  const [errorCity, setErrorCity] = useState('');
  const [errorState, setErrorState] = useState('');
  const [errorArea, setErrorArea] = useState('');

  //  selectTypeModal
  const [selectTypeList, setSelectTypeList] = useState(false);
  const [listSelectType, setListSelectType] = useState([]);
  const [errorSelectType, setErrorSelectType] = useState('');
  const [isRoomDataVisible, setIsRoomDataVisible] = useState(false);
  const [listRoomType, setListRoomType] = useState([]);
  const [errorRoomType, setErrorRoomType] = useState('');
  const [listFacility, setListFacility] = useState([]);
  const [errorFacility, setErrorFacility] = useState('');
  //  selectPreferenceModal
  const [isVisiblePreference, setIsVisiblePreference] = useState(false);

  //radioButton
  const [listPetFriendly, setListPetFriendly] = useState([]);
  const [listAreaType, setListAreaType] = useState([]);

  //slider
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  
  const isValid = () => {
    let validate = true;

    setErrorArea('');
    setErrorCity('');
    setErrorState('');

    if (area.trim().length === 0) {
      validate = false;
      setErrorArea('*Please enter your area!');
    } else if (city.trim().length === 0) {
      validate = false;
      setErrorCity('*Please enter your city!');
    } else if (state.trim().length === 0) {
      validate = false;
      setErrorState('*Please enter your state!');
    }

    return validate;
  };

  const selectTypeClick = () => {
    let validate = true;

    setErrorSelectType('');
    setErrorRoomType('');
    setErrorFacility('');

    const selectSelectedItems = listSelectType.filter(item => item.isSelected);
    const roomSelectedItems = listRoomType.filter(item => item.isSelected);
    const facilitySelectedItems = listFacility.filter(item => item.isSelected);

    if (selectSelectedItems.length === 0) {
      validate = false;
      setErrorSelectType('*Please select any home type');
    } else if (roomSelectedItems.length === 0) {
      validate = false;
      setErrorRoomType('*Please select any room type');
    } else if (facilitySelectedItems.length === 0) {
      validate = false;
      setErrorFacility('*Please select any facility type');
    }

    return validate;
  };

  const selectPreferenceClick = () => {
    let validate = true;

    const listIndex = listPreferenceData
      .map((item, index) => (item.isSelected ? -1 : index))
      .filter(index => index !== -1);
      
    const index0 = listIndex[0];

    if (index0 !== undefined && index0 !== null) {
      const newList = [...listPreferenceData]
      newList[index0].error = '*Please select the valid preference.'
      setListPreferenceData(newList)
      validate = false;
    }

    return validate;
  };

  useEffect(() => {
    const data = props.route.params;
    if (data && data.fromDash) {
      setIsFromDashboard(data.fromDash);
    }
    doGetData();
  }, [props.route.params]);

  const doGetData = () => {
    const selectTypeData = defaultPopupData.selectType;
    setListSelectType(selectTypeData);

    const roomTypeData = defaultPopupData.roomType;
    setListRoomType(roomTypeData);

    const facilityTypeData = defaultPopupData.facilityType;
    setListFacility(facilityTypeData);

    const communityNeighborsData = defaultPopupData.communityNeighborsData;
    setListPreferenceData(communityNeighborsData);

    const newListPet = [];
    newListPet.push({id: 1, title: 'Allow', isSelected: false});
    newListPet.push({id: 2, title: 'Not Allow', isSelected: true});
    setListPetFriendly(newListPet);

    const newListAreaType = [];
    newListAreaType.push({id: 1, title: 'Crowded', isSelected: false});
    newListAreaType.push({id: 2, title: 'Peacefull', isSelected: true});
    setListAreaType(newListAreaType);
  };

  return (
    <>
      <StatusBar
        backgroundColor={
          isFromDashboard === true
            ? Theme.colors.bgColor2
            : Theme.colors.bgColor4
        }
        barStyle={'dark-content'}
        hidden={false}
      />
      <SafeAreaView style={styles.viewMainContainer}>
        <View style={styles.container}>
          {isFromDashboard === true ? (
            <Header
              title={'RentEase'}
              showIcon={0}
              ProfileIcon={true}
              onPress={() => {
                props.navigation.navigate('ProfilePage');
              }}
            />
          ) : null}
          <KeyboardAwareScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {isFromDashboard === false ? (
              <View style={styles.viewAppImage}>
                <Image style={styles.appImage} source={Theme.icons.AppIcon} />
                <Text style={styles.textTitle}>Choose Your Preferences</Text>
              </View>
            ) : null}
            <View style={styles.viewMain}>
              <CustomSelect
                title={'Home Type'}
                touchableTitle={'Select Type'}
                onPress={() => {
                  setSelectTypeList(true);
                }}
              />
              <CustomSelect
                title={'Community and Neighbors'}
                touchableTitle={'Select Preference'}
                onPress={() => {
                  setIsVisiblePreference(true);
                }}
              />
              <CustomSelect
                title={'Your Location'}
                touchableTitle={'Detect Location'}
                onPress={() => {}}
              />
              <View>
                <InputText
                  title={'Area'}
                  placeholder={'Enter your area'}
                  value={area}
                  onChangeText={setArea}
                  error={errorArea}
                />
              </View>
              <View style={styles.viewRow}>
                <View style={[styles.viewMR08, {flex: 1}]}>
                  <InputText
                    title={'City'}
                    placeholder={'Enter your city'}
                    value={city}
                    onChangeText={setCity}
                    error={errorCity}
                  />
                </View>
                <View style={[styles.viewML08, {flex: 1}]}>
                  <InputText
                    title={'State'}
                    placeholder={'Enter your state'}
                    value={state}
                    onChangeText={setState}
                    error={errorState}
                  />
                </View>
              </View>
              <View style={styles.viewSlider}>
                <Text style={styles.textSubTitle}>Prize Range</Text>
                <Slider
                  style={styles.slider}
                  min={2000}
                  max={10000}
                  step={1}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={handleValueChange}
                />
                <View style={styles.viewRow}>
                  <Text style={[styles.textSubTitle, {flex: 1}]}>2000</Text>
                  <Text style={styles.textSubTitle}>20000</Text>
                </View>
              </View>
              <RadioGroup
                title="Pet-Friendly"
                ListData={listPetFriendly}
                onChange={indexMain => {
                  const newList = [...listPetFriendly];
                  newList.map((item, index) => {
                    if (index === indexMain) {
                      item.isSelected = true;
                    } else {
                      item.isSelected = false;
                    }
                  });
                  setListPetFriendly(newList);
                }}
              />
              <RadioGroup
                title="Area-Type"
                ListData={listAreaType}
                onChange={indexMain => {
                  const newList = [...listAreaType];
                  newList.map((item, index) => {
                    if (index === indexMain) {
                      item.isSelected = true;
                    } else {
                      item.isSelected = false;
                    }
                  });
                  setListAreaType(newList);
                }}
              />
            </View>
          </KeyboardAwareScrollView>
          <Button
            title={'NEXT'}
            onPress={() => {
              if (isValid()) {
                props.navigation.navigate('ScreenStackNavigation');
              }
            }}
          />
          {/* SelectTypeModal */}
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
                    <Text style={styles.modalText}>{'Home Type'}</Text>
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

                    <SelectListType
                      title={'Facility'}
                      ListData={listFacility}
                      onItemClick={mainId => {
                        const newList = [...listFacility];
                        newList.map(item => {
                          if (item.id === mainId) {
                            item.isSelected = !item.isSelected;
                            setErrorFacility('');
                          } else {
                            item.isSelected = false;
                          }
                        });
                        setListFacility(newList);
                      }}
                      error={errorFacility}
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
          {/* SelectPreferenceModal */}
          <CustomMenu
            visible={isVisiblePreference}
            onClose={() => {
              setIsVisiblePreference(!isVisiblePreference);
            }}
            onDone={() => {
              if (selectPreferenceClick()) {
                setIsVisiblePreference(!isVisiblePreference);   
              }}}
            title={'Community & Neighbors'}
            ListData={listPreferenceData}
            onItemClick={(mainId, itemId) => {
              const newList = [...listPreferenceData];
              newList.map(item => {
                if (item.id === mainId) {
                  item.data.map(_item => {
                    if (_item.id === itemId) {
                      _item.isSelected = !_item.isSelected;
                    } else {
                      _item.isSelected = false;
                    }
                  });
                  item.isSelected = item.data.some(item => item.isSelected);
                  item.error = '';
                }
              });
              setListPreferenceData(newList);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PreferenceScreen;
