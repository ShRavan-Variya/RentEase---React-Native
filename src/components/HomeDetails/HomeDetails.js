import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import HomeInnerDetails from './HomeInnerDetails';
import Theme from '../../theme/Theme';
import styles from './styles';

const HomeDetails = props => {
  const renderMainItem = (item, index) => {
    return (
      <HomeInnerDetails
        key={index + 1}
        id={item.id}
        title={item.title}
        subTitle={item.subTitle}
      />
    );
  };
  return (
    <View style={props.style}>
      <View style={styles.viewRow}>
        <Text style={styles.textTitle}>{props.title}</Text>
        {props.isOwner ? (
          <TouchableOpacity onPress={props.onPress}>
            <Image style={styles.editIcon} source={Theme.icons.EditIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.viewFWrap}>{props.ListData.map(renderMainItem)}</View>
      {props.error ? (
        <Text style={styles.textError}>{props.error}</Text>
      ) : null}
    </View>
  );
};

export default HomeDetails;
