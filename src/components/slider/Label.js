import React, { memo } from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.label} {...restProps}>
      <Text style={styles.textLabel}>{text}</Text>
    </View>
  );
};

export default memo(Label);
