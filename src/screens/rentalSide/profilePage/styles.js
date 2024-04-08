import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
const styles = StyleSheet.create({
  viewMainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.appColor,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.bgColor4,
  },
  viewBottom:{
    marginHorizontal:Theme.responsiveSize.size15,
    marginVertical:Theme.responsiveSize.size10,
  },
  viewMain:{
    flex:1,
    marginVertical:Theme.responsiveSize.size16,
    marginHorizontal:Theme.responsiveSize.size15,
  },
  textTitle:{
    fontFamily:Theme.fonts.latoBold,
    color: Theme.colors.textColor5,
    fontSize: Theme.responsiveSize.size14,
  },
  divider: {
    height: Theme.responsiveSize.size01,
    backgroundColor: Theme.colors.bgColor9,
    marginVertical: Theme.responsiveSize.size10,
  },
  viewRow:{
    flexDirection:'row',
    alignItems: 'center',
  },
  logOutIcon:{
    height:Theme.responsiveSize.size20,
    width:Theme.responsiveSize.size20,
  },
  textRed:{
    fontFamily:Theme.fonts.latoBold,
    color: Theme.colors.textColor7,
    fontSize: Theme.responsiveSize.size14,
    marginHorizontal:Theme.responsiveSize.size05,
  },
  viewBranding:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSmall:{
    fontFamily:Theme.fonts.latoRegular,
    color: Theme.colors.textColor5,
    fontSize: Theme.responsiveSize.size08,
    marginVertical:Theme.responsiveSize.size01
  },
  textSmallBlue:{
    fontWeight: '400',
    color: Theme.colors.textColor1,
    fontSize: Theme.responsiveSize.size08,
    marginVertical:Theme.responsiveSize.size01
  },

});

export default styles;
