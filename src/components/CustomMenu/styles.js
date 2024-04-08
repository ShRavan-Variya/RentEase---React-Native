import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Theme.colors.bgColor7,
  },
  centeredViewOther: {
    justifyContent: 'center',
    marginHorizontal: Theme.responsiveSize.size25,
  },
  modalView: {
    maxHeight: Dimensions.get('window').height/2+150,
    backgroundColor: 'white',
    borderRadius: Theme.responsiveSize.size08,
    padding: Theme.responsiveSize.size12,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalText: {
    flex: 1,
    fontSize: Theme.responsiveSize.size20,
    fontFamily:Theme.fonts.latoBold,
    color: Theme.colors.textColor1,
  },
  divider: {
    backgroundColor: Theme.colors.bgColor3,
    height: Theme.responsiveSize.size01,
    marginVertical: Theme.responsiveSize.size10, 
  },
  scrollView:{
    flexGrow:1,
  },
  viewMain:{
      marginVertical:Theme.responsiveSize.size05,
  },
  textSubTitle:{
    fontSize:Theme.responsiveSize.size13,
    fontFamily:Theme.fonts.latoRegular,
    color:Theme.colors.textColor5,
    marginBottom:Theme.responsiveSize.size03
  },
  viewFWrap:{
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems: 'center',
  },
  showRentData:{
    marginTop:Theme.responsiveSize.size10
  },
  closeButton: {
    height: Theme.responsiveSize.size25,
    width: Theme.responsiveSize.size25,
  },
  viewChooseImage:{
    marginHorizontal:Theme.responsiveSize.size05,
    marginVertical:Theme.responsiveSize.size04,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraImage:{
    height:Theme.responsiveSize.size22,
    width:Theme.responsiveSize.size22,
    marginRight:Theme.responsiveSize.size10
  },
  textBlackBold:{
    fontSize:Theme.responsiveSize.size14,
    fontFamily:Theme.fonts.latoSemibold,
    color:Theme.colors.textColor4
  },
  galleryImage:{
    height:Theme.responsiveSize.size22,
    width:Theme.responsiveSize.size22,
    marginRight:Theme.responsiveSize.size10
  },
  cancelImage:{
    height:Theme.responsiveSize.size22,
    width:Theme.responsiveSize.size22,
    marginRight:Theme.responsiveSize.size10
  },
  textError:{
    marginHorizontal: Theme.responsiveSize.size02,
    marginTop:Theme.responsiveSize.size03,
    fontSize: Theme.responsiveSize.size11,
    fontFamily:Theme.fonts.latoMedium,
    color: 'red',
  },

});

export default styles;
