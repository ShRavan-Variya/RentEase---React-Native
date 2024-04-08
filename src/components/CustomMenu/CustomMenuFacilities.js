import React, {useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button} from '../Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FacilitiesData} from '../Facilities';

const CustomMenuFacilities = props => {
  const renderListFacilities = (item, index) => {
    return (
      <FacilitiesData
        key={index + 1}
        isAddVisisble={false}
        value={item.title}
        onDelete={() => {
          props.onItemDelete(index);
        }}
      />
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.centeredView}>
        <View style={styles.centeredViewOther}>
          <View style={styles.modalView}>
            <View style={styles.viewRow}>
              <Text style={styles.modalText}>{props.title}</Text>
              <TouchableOpacity onPress={props.onClose}>
                <Image style={styles.closeButton} source={Theme.icons.Close} />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              {props.listData.map(renderListFacilities)}
              <FacilitiesData
                placeholder={'Enter the title'}
                value={props.value}
                isAddVisisble={true}
                onChangeText={props.onChangeText}
                onDelete={props.onClearText}
                onAddData={props.onClickAddData}
                error={props.error}
                errorDone={props.errorDone}
              />
            </KeyboardAwareScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                title={'DONE'}
                viewStyle={{
                  paddingHorizontal: Theme.responsiveSize.size25,
                  marginTop: Theme.responsiveSize.size20,
                }}
                textStyle={{
                  fontSize:Theme.responsiveSize.size13,
                  paddingVertical: Theme.responsiveSize.size05,
                }}
                onPress={props.onDone}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomMenuFacilities;
