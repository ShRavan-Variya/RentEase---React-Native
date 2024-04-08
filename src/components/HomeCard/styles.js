import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    backgroundColor:Theme.colors.bgColor2,
    borderColor:Theme.colors.borderColor5,
    borderRadius:Theme.responsiveSize.size05,
    borderWidth:Theme.responsiveSize.size01,
    marginHorizontal:Theme.responsiveSize.size15,
    marginVertical:Theme.responsiveSize.size10,
    padding:Theme.responsiveSize.size12
  },
  homeImage:{
    marginBottom:Theme.responsiveSize.size04,
    borderRadius:Theme.responsiveSize.size02,
    height:Theme.responsiveSize.size140,
    justifyContent:'center',
    alignItems: 'center',
  },
  viewContainer:{
    position:'absolute',
    margin:Theme.responsiveSize.size12,
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
  locationIcon:{
    height:Theme.responsiveSize.size18,
    width:Theme.responsiveSize.size18,
  },
  mobileIcon:{
    height:Theme.responsiveSize.size15,
    width:Theme.responsiveSize.size15,
  },
  userIcon:{
    height:Theme.responsiveSize.size15,
    width:Theme.responsiveSize.size15,
  },
  viewAddress:{
    marginVertical:Theme.responsiveSize.size10,
    flexDirection:'row',
    alignItems: 'flex-start',
  },
  viewRow:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSubTitle:{
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoRegular,
    color: Theme.colors.textColor4,
    marginHorizontal:Theme.responsiveSize.size05,
  },
  flex1:{
    flex:1
  },
  viewRowCommon:{
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
  }
  
});

export default styles;
