import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {SelectType} from '../SelectType';
import {InputText} from '../InputText';

const SelectListType = props => {
  return (
    <View>
      {props.roomData ? (
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
          {props.showRentData ? (
            <View style={styles.showRentData}>
            <InputText
              title={'Rent'}
              placeholder={'Enter the rent'}
              value={props.valueRent}
              keyboardType={'number-pad'}
              onChangeText={props.onChangeTextRent}
              error={props.errorRent}
            />
            <InputText
              title={'Deposite'}
              placeholder={'Enter the deposite'}
              value={props.valueDeposite}
              keyboardType={'number-pad'}
              onChangeText={props.onChangeTextDeposite}
              error={props.errorDeposite}
            />
          </View>
          ) : null}
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default SelectListType;
