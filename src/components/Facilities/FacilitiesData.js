import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {InputText} from '../InputText';

const FacilitiesData = props => {
  return (
    <View>
      <View style={styles.viewFacilities}>
        <View style={{flex: 1}}>
          {props.isAddVisisble ? (
            <InputText
              viewMainStyle={styles.viewMainStyle}
              viewStyle={styles.inputText}
              bgStyle={styles.bgStyle}
              placeholder={props.placeholder}
              value={props.value}
              onChangeText={props.onChangeText}
            />
          ) : (
            <Text style={styles.bgStyleOfText}>{props.value}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.marginH12} onPress={props.onDelete}>
          <Image
            style={styles.deleteRedIcon}
            source={Theme.icons.DeleteRedIcon}
          />
        </TouchableOpacity>
        {props.isAddVisisble ? (
          <TouchableOpacity onPress={props.onAddData}>
            <Image style={styles.plusIcon} source={Theme.icons.AddBlackIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.plusIcon} />
        )}
      </View>
      {props.error ? <Text style={styles.textError}>{props.error}</Text> : props.errorDone ? <Text style={styles.textError}>{props.errorDone}</Text> : null}
    </View>
  );
};

export default FacilitiesData;
