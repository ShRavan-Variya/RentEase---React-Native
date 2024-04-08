import React, {useState} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';

const ImageOfHome = props => {
  return (
    <ImageBackground style={styles.homeImage} source={{uri: props.image}}>
      {props.isLive && !props.isEdit ? (
        <View style={styles.viewContainer}>
          <Text style={styles.textTitle}>Live</Text>
        </View>
      ) : null}
      {props.isEdit ? (
        <View style={styles.imageBG}>
          <TouchableOpacity onPress={props.onPress}>
            <Image style={styles.editIcon} source={Theme.icons.EditImageIcon} />
          </TouchableOpacity>
        </View>
      ) : null}
    </ImageBackground>
  );
};


export default ImageOfHome;
