import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Theme from '../../theme/Theme';

const Header = props => {
  return (
    <View style={styles.viewMain}>
      <Image style={styles.appImage} source={Theme.icons.AppIcon} />
      <Text style={styles.appTitle}>{props.title}</Text>
      {props.showIcon != 0 ? (
        <TouchableOpacity style={styles.viewMR15} onPress={props.onChange}>
          <Image
            style={styles.preferenceIcon}
            source={
              props.showIcon === 1
                ? Theme.icons.PreferenceIcon
                : props.showIcon === 2
                ? Theme.icons.AddIcon
                : props.isRental === false && props.showIcon === 3 && !props.isEdit
                ? Theme.icons.EditIcon : null
            }
          />
        </TouchableOpacity>
      ) : null}
      {props.DeleteIcon && props.isEdit ? (
        <TouchableOpacity style={styles.viewMR15} onPress={props.onDelete}>
          <Image
            style={styles.preferenceIcon}
            source={Theme.icons.DeleteRedIcon}
          />
        </TouchableOpacity>
      ):null}
      {props.ProfileIcon ? (
        <TouchableOpacity onPress={props.onPress}>
          <Image style={styles.profileIcon} source={Theme.icons.ProfileIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
