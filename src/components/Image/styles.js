import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    marginHorizontal: Theme.responsiveSize.size15,
  },
  homeImage:{
    marginVertical:Theme.responsiveSize.size10,
    borderRadius:Theme.responsiveSize.size02,
    marginTop:Theme.responsiveSize.size15,
    height:Theme.responsiveSize.size150,
  }, 
  viewContainer:{
    position:'absolute',
    backgroundColor:Theme.colors.bgColor11,
    paddingLeft:Theme.responsiveSize.size05,
    paddingRight:Theme.responsiveSize.size08,
    paddingVertical:Theme.responsiveSize.size01,
    borderBottomEndRadius:Theme.responsiveSize.size12
  },
  textTitle:{
    color:Theme.colors.textColor2,
    fontFamily:Theme.fonts.latoBlack,
  },
  imageBG:{
    flex: 1,
    backgroundColor:Theme.colors.bgColor10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon:{
    height:Theme.responsiveSize.size35,
    width:Theme.responsiveSize.size35,
  },

});

export default styles;
