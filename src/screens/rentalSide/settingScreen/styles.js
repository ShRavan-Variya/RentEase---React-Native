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
  paddingV10:{
    paddingVertical:Theme.responsiveSize.size10
  },
  viewRow:{
    flexDirection:'row',
    alignItems: 'center',
  },
  viewMargin:{
    marginHorizontal:Theme.responsiveSize.size15,
    // marginBottom:Theme.responsiveSize.size05,
  },
  viewMR08:{
    flex:1,
    marginRight:Theme.responsiveSize.size08,
  },
  viewML08:{
    flex:1,
    marginLeft:Theme.responsiveSize.size08,
  },
  scrollView:{
    flex:1,
  },
  contentScrollView:{
    flexGrow:1,
    paddingVertical:Theme.responsiveSize.size15,
    paddingBottom:Theme.responsiveSize.size50,
  },

});

export default styles;
