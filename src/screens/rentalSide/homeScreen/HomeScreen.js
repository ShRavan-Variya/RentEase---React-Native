import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Header } from '../../../components/Header';
import { HomeCard } from '../../../components/HomeCard';
import { AppConstants, cacheData } from '../../../module';
import { Loader } from '../../../components/Loader';
import { RNToasty } from 'react-native-toasty';
import { isNetworkAvailable } from '../../../api';
import { getPropertyList } from '../../../services/auth';

const HomeScreen = props => {
  const [loading, setLoading] = useState(false);
  const [listOfHomes, setListOfHomes] = useState([]);
  const [isRental, setIsRental] = useState(true);

  useEffect(() => {
    doGetHomeList();
  }, []);

  const doGetHomeList = async () => {
    const userType = await cacheData.getDataFromCachedWithKey(
      AppConstants.AsyncKeyLiterals.userType,
    );
    setIsRental(userType === 2);
    if (userType === 2) {
      doGetListOfProperty();
    }
  };

  const doGetListOfProperty = async () => {
    const isConnected = await isNetworkAvailable();
    setLoading(true);
    if (isConnected) {
      try {
        const response = await getPropertyList();
        setLoading(false);
        if (response && response.status) {
          const data = response.data
          setListOfHomes(data)
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

  const renderListHomes = ({ item, index }) => {
    
    return (
      <HomeCard
        image={item.main_image}
        addressLine1={item.address_line1}
        addressLine2={item.address_line2}
        area={item.area}
        city={item.city}
        state={item.state}
        phone_number={item.phone_number}
        firstName={item.firstName}
        lastName={item.lastName}
        isLive={isRental ? false : item.isLive}
        onClick={() => {
          props.navigation.navigate('DetailsScreen', {
            id:item._id
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.viewMainContainer}>
      <View style={styles.container}>
        <Header
          title={'RentEase'}
          showIcon={isRental ? 1 : 2}
          onChange={() => {
            if (isRental) {
              props.navigation.navigate('PreferenceScreen', { fromDash: true });
            } else {
              props.navigation.navigate('DetailsScreen', { isFromAdd: true });
            }
          }}
          ProfileIcon={true}
          onPress={() => {
            props.navigation.navigate('ProfilePage');
          }}
        />

        <FlatList
          data={listOfHomes}
          renderItem={renderListHomes}
          contentContainerStyle={styles.paddingV10}
          showsVerticalScrollIndicator={false}
          keyExtractor={(i, index) => (index + 1).toString()}
        />
      </View>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default HomeScreen;
