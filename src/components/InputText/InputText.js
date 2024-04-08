import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';

const InputText = props => {
  return (
    <View style={[styles.viewMain,props.viewMainStyle]}>
      {props.title ? (
        <Text style={[styles.textSubTitle]}>{props.title}</Text>
      ) : null}
      <View style={[styles.viewBgInputText, props.bgStyle]}>
        <TextInput
          style={[styles.textInput, props.viewStyle]}
          value={props.value}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secure}
          placeholder={props.placeholder}
          placeholderTextColor={Theme.colors.textColor6}
          onChangeText={props.onChangeText}
        />
        {props.isPassword ? (
          <TouchableOpacity onPress={props.onChangeSecurity}>
            <Image
              style={styles.imageIcon}
              resizeMode={'contain'}
              source={props.secure ? Theme.icons.EyeOn : Theme.icons.EyeOff}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.error ? (
        <Text style={styles.textError}>{props.error}</Text>
      ) : null}
    </View>
  );
};

export default InputText;
