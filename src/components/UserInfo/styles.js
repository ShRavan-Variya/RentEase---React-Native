import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    flexDirection:'row',
    alignItems: 'flex-start',
    marginVertical:Theme.responsiveSize.size05,
  },
  image: {
    height:Theme.responsiveSize.size18,
    width:Theme.responsiveSize.size18,
  },
  text:{
    fontFamily:Theme.fonts.latoMedium,
    color:Theme.colors.textColor4,
    fontSize:Theme.responsiveSize.size13,
    marginHorizontal:Theme.responsiveSize.size05,
  }
});

export default styles;
