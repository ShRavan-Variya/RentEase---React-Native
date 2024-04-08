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
  scrollView: {
    flexGrow: 1,
    paddingBottom: Theme.responsiveSize.size50,
  },
  viewTop: {
    alignItems: 'center',
    marginVertical: Theme.responsiveSize.size15,
    marginBottom: Theme.responsiveSize.size50,
  },
  appImage: {
    height: Theme.responsiveSize.size85,
    width: Theme.responsiveSize.size85,
    marginBottom:Theme.responsiveSize.size06
  },
  textTitle: {
    fontSize: Theme.responsiveSize.size30,
    fontFamily:Theme.fonts.latoBlack,
    color: Theme.colors.textColor4,
  },
  viewMain:{
    marginHorizontal:Theme.responsiveSize.size15
  },
  viewBottom:{
    marginHorizontal:Theme.responsiveSize.size15,
    marginTop: Theme.responsiveSize.size15,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMRight:{
    marginRight: Theme.responsiveSize.size08,
    flex: 1
  },
  viewMLeft:{
    marginLeft: Theme.responsiveSize.size08,
    flex: 1
  },
  checkBox: {
    height: Theme.responsiveSize.size15,
    width: Theme.responsiveSize.size15,
  },
  smallText: {
    fontSize: Theme.responsiveSize.size10,
    fontFamily:Theme.fonts.latoRegular,
    color: Theme.colors.textColor4,
    marginHorizontal: Theme.responsiveSize.size05,
  },
  textViewLogIn: {
    alignItems: 'center',
    marginBottom: Theme.responsiveSize.size12,
  },
  textCommon: {
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoMedium,
    color: Theme.colors.textColor4,
    marginHorizontal: Theme.responsiveSize.size05,
  },
  textBold: {
    fontFamily:Theme.fonts.latoBlack,
  },
});

export default styles;
