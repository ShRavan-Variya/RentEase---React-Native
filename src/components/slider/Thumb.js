import React, {memo} from 'react';
import {View} from 'react-native';
import styles from './styles';

const Thumb = ({name}) => {
  return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

export default memo(Thumb);
