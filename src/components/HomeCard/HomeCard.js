import React from 'react';
import {Image,Text,TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';
import UserInfo from '../UserInfo/UserInfo';

const HomeCard = props => {
  return (
    <TouchableOpacity style={styles.viewMain} onPress={props.onClick}>
      <Image style={styles.homeImage} source={{uri: props.image}} />

      {props.isLive ? (
        <View style={styles.viewContainer}>
        <Text style={styles.textTitle}>Live</Text>
      </View>
      ) : null}
      
      <UserInfo
        image={Theme.icons.LocationIcon}
        title={'B-101, ShantiKunj App., Akhand-Anand Soc., Dabholi Road, Katargam, Surat.'}
      />
      <View style={styles.viewRow}>
        <UserInfo
          image={Theme.icons.MobileIcon}
          title={'+91 63543 48235'}
          styleImage={styles.mobileIcon}
          styleText={styles.textSubTitle}
        />
        <UserInfo
          image={Theme.icons.UserIcon}
          title={'Ashish Pipaliya'}
          styleImage={styles.userIcon}
          styleText={styles.textSubTitle}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;
