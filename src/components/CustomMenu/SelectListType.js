import React from 'react';
import { Text, View } from 'react-native';
import { SelectType } from '../SelectType';
import styles from './styles';

const SelectListType = props => {
  return (
    <View style={styles.viewMain}>
      <Text style={styles.textSubTitle}>{props.title}</Text>
      <View style={styles.viewFWrap}>
        {props.ListData.map((item, index) => (
          <SelectType
            key={index + 1}
            id={item.id}
            title={item.title}
            isSelected={item.isSelected}
            onItemClick={() => props.onItemClick(item.id)}
          />
        ))}
      </View>
      {props.error ? (
        <Text style={styles.textError}>{props.error}</Text>
      ) : null}
    </View>
  );
};

export default SelectListType;
