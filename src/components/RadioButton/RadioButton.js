import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';

const RadioButton = props => {
  return (
    <View style={styles.viewRow}>
      <TouchableOpacity onPress={props.onChangeSelect}>
        <View style={styles.viewRow}>
          <Image
            style={styles.radioButton}
            source={
              props.isSelected ? Theme.icons.RadioOn : Theme.icons.RadioOff
            }
          />
          <Text style={styles.textCommon}>{props.data}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
