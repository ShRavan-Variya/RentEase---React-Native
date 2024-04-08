import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const HomeInnerDetails = props => {
  return (
    <View style={styles.viewMain}>
      {props.title && props.subTitle ? (
        <>
          <Text style={styles.textTitleItem}>{props.title}</Text>
          <Text style={styles.textSubTitle}> ● {props.subTitle}</Text>
        </>
      ) : (
        <>
          <Text style={styles.textTitleItem}>● {props.title}</Text>
        </>
      )}
    </View>
  );
};

export default HomeInnerDetails;
