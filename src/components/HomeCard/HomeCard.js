import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';
import UserInfo from '../UserInfo/UserInfo';
import { API_BASE_URL } from '../../api/api';

const HomeCard = props => {
  return (
    <TouchableOpacity style={styles.viewMain} onPress={props.onClick}>
      <Image style={styles.homeImage} source={{ uri: `${API_BASE_URL}uploads/${props.image}` }} />

      {props.isLive ? (
        <View style={styles.viewContainer}>
          <Text style={styles.textTitle}>Live</Text>
        </View>
      ) : null}

      <UserInfo
        image={Theme.icons.LocationIcon}
        title={`${props.addressLine1} ` + `${props.addressLine2} ` + `${props.area} ` + `${props.city} ` + `${props.state} `}
      />
      <View style={styles.viewRow}>
        <UserInfo
          image={Theme.icons.MobileIcon}
          title={`${props.firstName} ` + `${props.lastName} `}
          styleImage={styles.mobileIcon}
          styleText={styles.textSubTitle}
        />
        <UserInfo
          image={Theme.icons.UserIcon}
          title={`+91 ${props.phone_number}`}
          styleImage={styles.userIcon}
          styleText={styles.textSubTitle}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;
