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
  viewHomeDetails:{
    marginTop:Theme.responsiveSize.size10,
    paddingVertical: Theme.responsiveSize.size10,
  },
  paddingV10: {
    paddingVertical: Theme.responsiveSize.size10,
  },
  viewMain: {
    marginHorizontal: Theme.responsiveSize.size15,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMB10: {
    marginBottom: Theme.responsiveSize.size10,
  },
  userIcon: {
    height: Theme.responsiveSize.size16,
    width: Theme.responsiveSize.size16,
  },
  viewUserInfo:{
    marginVertical:Theme.responsiveSize.size07
  },
  viewLive:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.responsiveSize.size15,
  },
  textLive: {
    flex:1,
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoMedium,
    color: Theme.colors.textColor5,
  },
  viewSwitchButton:{
    padding:Theme.responsiveSize.size04,
    backgroundColor:Theme.colors.bgColor12,
    borderRadius:Theme.responsiveSize.size20,
    paddingRight:Theme.responsiveSize.size15,
  },
  switchButton:{
    width:Theme.responsiveSize.size12,
    height:Theme.responsiveSize.size12,
    backgroundColor:Theme.colors.bgColor2,
    borderRadius:Theme.responsiveSize.size20,
  },
  textUserInfoStyle:{
    fontFamily:Theme.fonts.latoRegular
  },
  locationIcon: {
    height: Theme.responsiveSize.size18,
    width: Theme.responsiveSize.size18,
  },
  mobileIcon: {
    height: Theme.responsiveSize.size16,
    width: Theme.responsiveSize.size16,
  },
  textCommon: {
    fontSize: Theme.responsiveSize.size13,
    fontWeight: '400',
    color: Theme.colors.textColor4,
    marginHorizontal: Theme.responsiveSize.size05,
  },
  textSubTitle: {
    fontSize: Theme.responsiveSize.size15,
    fontWeight: '500',
    color: Theme.colors.textColor5,
    marginHorizontal: Theme.responsiveSize.size05,
  },
  flex1: {
    flex: 1,
  },
  viewAddress: {
    marginVertical: Theme.responsiveSize.size10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textTitle: {
    fontSize: Theme.responsiveSize.size18,
    fontWeight: '500',
    color: Theme.colors.textColor4,
  },
  viewFWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: Theme.responsiveSize.size20,
  },
  viewMR: {
    flex: 1,
    marginRight: Theme.responsiveSize.size08,
  },
  viewML: {
    flex: 1,
    marginLeft: Theme.responsiveSize.size08,
  },
  buttonSave: {
    flex:1,
    marginHorizontal: Theme.responsiveSize.size08,
    marginLeft: Theme.responsiveSize.size15,
  },
  buttonCancle: {
    flex:1,
    marginHorizontal: Theme.responsiveSize.size08,
    marginRight: Theme.responsiveSize.size15,
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
  showRentData:{
    marginTop:Theme.responsiveSize.size10
  },
  viewDoneButton:{
    paddingHorizontal: Theme.responsiveSize.size25,
    marginTop: Theme.responsiveSize.size20,
  },
  textDoneButton:{
    fontSize: Theme.responsiveSize.size13,
    paddingVertical: Theme.responsiveSize.size05,
  },
  viewTouchable:{
    alignItems:'center',
    marginHorizontal: Theme.responsiveSize.size05,
    marginVertical: Theme.responsiveSize.size05,
  },
  viewDeleteButton:{
    paddingHorizontal: Theme.responsiveSize.size28,
    marginTop: Theme.responsiveSize.size20,
  },
  textMain:{
    marginHorizontal:Theme.responsiveSize.size15,
    marginVertical:Theme.responsiveSize.size10,
    fontSize:Theme.responsiveSize.size15,
    fontFamily:Theme.fonts.latoSemibold,
    color:Theme.colors.textColor7,
    textAlign:'center'
  },

  // ```
  viewBottom:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginTop:Theme.responsiveSize.size18
  },
  bgStyleFacilities:{
    marginTop:20
  }
});

export default styles;
