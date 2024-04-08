import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.responsiveSize.size15,
  },
  textSubTitle: {
    flex:1,
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoMedium,
    color: Theme.colors.textColor5,
  },
  flex1: {
    flex: 1,
  },
  touchableText: {
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoBold,
    color: Theme.colors.textColor1,
  },
});

export default styles;
