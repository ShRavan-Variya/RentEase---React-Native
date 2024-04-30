import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import ImageComp from './ImageComp';
import Theme from '../../theme/Theme';
import { API_BASE_URL } from '../../api/api';

const HomeImage = props => {
  const renderMainItem = (item, index) => {
    return (
      <View key={index}>
        <ImageComp
          image={item.isLocal ? item.image : `${API_BASE_URL}uploads/${item}`}
          isEdit={props.isEdit}
          onPressDelete={() => {
            props.onPressDelete(index);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.viewMain}>
      <Text style={styles.textTitle}>{props.title}</Text>
      <View style={styles.viewFWrap}>
        {props.isEdit === true ? (
          <TouchableOpacity style={styles.viewOuter} onPress={props.onPress}>
            <Image
              source={Theme.icons.GalleryIcon}
              resizeMode={'contain'}
              style={styles.imageIndex0}
            />
          </TouchableOpacity>
        ) : null}
        {props.ListData.map(renderMainItem)}
      </View>
      {props.error ? <Text style={styles.textError}>{props.error}</Text> : null}
    </View>
  );
};

export default HomeImage;
