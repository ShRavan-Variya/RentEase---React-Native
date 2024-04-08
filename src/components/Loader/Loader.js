import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Overlay} from '@rneui/themed';
import styles from './styles';
import Theme from '../../theme/Theme';

const Loader = props => {
  return (
    <Overlay isVisible={props.isLoading} onBackdropPress={console.log}>
      <View style={styles.viewLoader}>
        <ActivityIndicator size="large" color={Theme.colors.appColor} />
      </View>
    </Overlay>
  );
};

export default Loader;