import React, {useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button} from '../Button';
import {SelectType} from '../SelectType';
import {InputText} from '../InputText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Theme from '../../theme/Theme';

const CustomMenu = props => {
  const renderMainItem = (item, index) => {
    if (item.title === 'Room' && item.showRentData === true) {
      return (
        <View key={index + 1} style={styles.viewMain}>
          <Text style={styles.textSubTitle}>{item.title}</Text>
          <View style={styles.viewFWrap}>
            {item.data.map((_item, _index) => {
              return (
                <SelectType
                  key={_index + 1}
                  id={_item.id}
                  title={_item.title}
                  isSelected={_item.isSelected}
                  onItemClick={innerItemId =>
                    props.onItemClick(item.id, innerItemId)
                  }
                />
              );
            })}
          </View>
          {item.error ? <Text style={styles.textError}>{item.error}</Text> : null}
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
        </View>
      );
    }else if (item.title !== 'Room') {
      return (
        <View key={index + 1} style={styles.viewMain}>
          <Text style={styles.textSubTitle}>{item.title}</Text>
          <View style={styles.viewFWrap}>
            {item.data.map((_item, _index) => {
              return (
                <SelectType
                  key={_index + 1}
                  id={_item.id}
                  title={_item.title}
                  isSelected={_item.isSelected}
                  onItemClick={innerItemId =>
                    props.onItemClick(item.id, innerItemId)
                  }
                />
              );
            })}
          </View>
          {item.error ? <Text style={styles.textError}>{item.error}</Text> : null}
          {item.showRentData ? (
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
      );
    } else {
      return null
    }
    
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
              {props.isChooseImage ? null : (
                <TouchableOpacity onPress={props.onClose}>
                  <Image
                    style={styles.closeButton}
                    source={Theme.icons.Close}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.divider} />
            {props.isChooseImage ? (
              <View>
                <TouchableOpacity
                  style={styles.viewChooseImage}
                  onPress={props.onClickCamera}>
                  <Image
                    style={styles.cameraImage}
                    source={Theme.icons.CameraIcon}
                  />
                  <Text style={styles.textBlackBold}>{props.CameraTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.viewChooseImage}
                  onPress={props.onClickGallery}>
                  <Image
                    style={styles.galleryImage}
                    source={Theme.icons.GalleryIcon}
                  />
                  <Text style={styles.textBlackBold}>{props.GalleryTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={props.onCancle}
                  style={styles.viewChooseImage}>
                  <Image
                    style={styles.cancelImage}
                    source={Theme.icons.Close}
                  />
                  <Text style={styles.textBlackBold}>{props.CancleTitle}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                {props.ListData.map(renderMainItem)}
              </KeyboardAwareScrollView>
            )}

            {props.isChooseImage ? null : (
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
                    fontSize: Theme.responsiveSize.size13,
                    paddingVertical: Theme.responsiveSize.size05,
                  }}
                  onPress={props.onDone}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomMenu;
