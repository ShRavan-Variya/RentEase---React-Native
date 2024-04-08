import React from 'react';
import {Text,View} from 'react-native';
import styles from './styles';
import RadioButton from './RadioButton';

const RadioGroup = props => {
  const renderItem = (item, index) => {
    return (
      <RadioButton
        key={index + 1}
        id={item.id}
        data={item.title}
        isSelected={item.isSelected}
        onChangeSelect={() => props.onChange(index)}
      />
    );
  };

  return (
    <View style={styles.viewMain}>
      <Text style={styles.textSubTitle}>{props.title}</Text>
      <View style={styles.viewFWrap}>
        {props.ListData.map(renderItem)}
      </View>
    </View>
  );
};

export default RadioGroup;
