import React from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../theme/Theme';

const ImageComp = props => {
  return (
    <ImageBackground
      style={styles.homeImage}
      borderRadius={Theme.responsiveSize.size03}
      source={{uri: props.image}}
      resizeMode={'cover'}>
      {props.isEdit === true ? (
        <LinearGradient
          colors={['#000000a6', '#00000000']}
          style={styles.linearGradient}>
          {/* Delete Icon */}
          <TouchableOpacity onPress={props.onPressDelete}>
            <Image
              source={Theme.icons.DeleteIcon}
              style={styles.deleteIconContainer}
            />
          </TouchableOpacity>
        </LinearGradient>
      ) : null}
    </ImageBackground>
  );
};

export default ImageComp;
