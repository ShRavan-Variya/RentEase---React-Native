import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';

const SelectType = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onItemClick(props.id);
      }}>
      <View
        style={[
          styles.viewSelect,
          {
            backgroundColor: props.isSelected
              ? Theme.colors.bgColor6
              : Theme.colors.bgColor5,
          },
        ]}>
        <Text style={styles.textSelect}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectType;
