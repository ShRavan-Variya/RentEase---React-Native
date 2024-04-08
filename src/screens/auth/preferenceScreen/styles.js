import {Dimensions, StyleSheet} from 'react-native';
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
  viewAppImage: {
    alignItems: 'center',
    marginVertical: Theme.responsiveSize.size20,
    marginBottom: Theme.responsiveSize.size30,
  },
  appImage: {
    height: Theme.responsiveSize.size85,
    width: Theme.responsiveSize.size85,
    marginBottom:Theme.responsiveSize.size06
  },
  textTitle: {
    fontSize: Theme.responsiveSize.size26,
    fontFamily:Theme.fonts.latoBlack,
    color: Theme.colors.textColor4,
  },
  viewMain:{
    marginHorizontal: Theme.responsiveSize.size15,
    marginTop:Theme.responsiveSize.size15
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMR08: {
    marginRight: Theme.responsiveSize.size08,
  },
  viewML08: {
    marginLeft: Theme.responsiveSize.size08,
  },
  viewSlider: {
    marginBottom: Theme.responsiveSize.size16,
  },
  slider: {
    marginVertical: Theme.responsiveSize.size05,
  },
  textSubTitle: {
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoRegular,
    color: Theme.colors.textColor5,
  },
  //Modal styles ```
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
  closeButton: {
    height: Theme.responsiveSize.size25,
    width: Theme.responsiveSize.size25,
  },
  divider: {
    backgroundColor: Theme.colors.bgColor3,
    height: Theme.responsiveSize.size01,
    marginVertical: Theme.responsiveSize.size10, 
  },
  scrollView:{
    flexGrow:1,
  },
  viewDoneButton:{
    paddingHorizontal: Theme.responsiveSize.size25,
    marginTop: Theme.responsiveSize.size20,
  },
  textDoneButton:{
    fontSize: Theme.responsiveSize.size13,
    paddingVertical: Theme.responsiveSize.size05,
  },

  // ```
});

export default styles;
