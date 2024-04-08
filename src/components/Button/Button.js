import React from 'react';
import { Text,TouchableOpacity, View} from 'react-native';
import styles from './styles';

const Button = props => {
  return (
    <TouchableOpacity style={[styles.viewMain, props.viewMain]} onPress={props.onPress} >
      <View style={[styles.button, props.viewStyle]}>
        <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
