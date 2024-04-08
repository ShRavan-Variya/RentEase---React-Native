import React, { memo } from 'react';
import {View} from 'react-native';
import styles from './styles';

const Rail = () => {
  return (
    <View style={styles.rail}/>
  );
};

export default memo(Rail);
