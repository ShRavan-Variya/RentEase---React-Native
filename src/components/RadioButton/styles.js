import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain:{
    marginBottom:Theme.responsiveSize.size03
  },
  textSubTitle: {
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoMedium,
    color: Theme.colors.textColor5,
  },
  radioButton: {
    height: Theme.responsiveSize.size20,
    width: Theme.responsiveSize.size20,
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:Theme.responsiveSize.size04
  },
  viewFWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.responsiveSize.size05,
  },
  textCommon: {
    fontSize: Theme.responsiveSize.size13,
    fontFamily:Theme.fonts.latoMedium,
    color: Theme.colors.textColor4,
    marginHorizontal: Theme.responsiveSize.size05,
  },
});

export default styles;
