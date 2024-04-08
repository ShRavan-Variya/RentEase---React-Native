import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {Header} from '../../../components/Header';
import {HomeCard} from '../../../components/HomeCard';
import { AppConstants, cacheData } from '../../../module';

const HomeScreen = props => {
  const [listOfHomes, setListOfHomes] = useState([]);
  const [isRental, setIsRental] = useState(true);
  

  useEffect(() => {
    doGetHomeList();
  }, []);

  const doGetHomeList = async () => {

    const userType = await cacheData.getDataFromCachedWithKey(AppConstants.AsyncKeyLiterals.userType);
    setIsRental(userType === 2)

    const newList = [];
    for (let index = 0; index < 10; index++) {
      newList.push({
        id: index + 1,
        image:
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address:
          'B-101, ShantiKunj App., Akhand-Anand Soc., Dabholi Road, Katargam, Surat.',
        mobile: '+91 63543 48235',
        userName: 'Ashish Pipaliya',
        isLive: index%2 === 0,
      });
    }
    setListOfHomes(newList);
  };


  const renderListHomes = ({item, index}) => {
    return (
      <HomeCard
        id={item.id}
        image={item.image}
        address={item.address}
        mobile={item.mobile}
        userName={item.userName}
        isLive={isRental ? false : item.isLive}
        onClick={() => {
          props.navigation.navigate('DetailsScreen', {isFromAdd: false, isLive: isRental ? false : item.isLive});
        }}
      />
    );
  };

  // const fromPref = props.route.params?.isRental || false;
  
  return (
    <SafeAreaView style={styles.viewMainContainer}>
      <View style={styles.container}>
          <Header
            title={'RentEase'}
            showIcon={isRental ? 1 : 2}
            onChange={() => {
              if (isRental) {
                props.navigation.navigate('PreferenceScreen', {fromDash: true});
              } else {
                props.navigation.navigate('DetailsScreen', {isFromAdd: true});
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
    </SafeAreaView>
  );
};

export default HomeScreen;
