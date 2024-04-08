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
  }
});

export default styles;
