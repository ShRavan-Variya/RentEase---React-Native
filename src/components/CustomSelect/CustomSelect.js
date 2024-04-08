import React from 'react';
import { Text,TouchableOpacity, View} from 'react-native';
import styles from './styles';

const CustomSelect = props => {
  return (
    <View style={[styles.viewMain,props.viewMain]}>
      <Text style={styles.textSubTitle}>{props.title}</Text>
      <TouchableOpacity
        onPress={props.onPress}>
        <Text style={[styles.touchableText]}>{props.touchableTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSelect;
