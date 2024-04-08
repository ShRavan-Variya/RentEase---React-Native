import React from 'react';
import {Image, Text,View} from 'react-native';
import styles from './styles';

const UserInfo = props => {
  return (
    <View style={[styles.viewMain, props.viewMain]}>
      <Image style={[styles.image, props.styleImage]} source={props.image} />
      <Text style={[styles.text, props.styleText]}>{props.title}</Text>
    </View>
  );
};

export default UserInfo;
