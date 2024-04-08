import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    backgroundColor: Theme.colors.bgColor2,
    borderBottomColor: Theme.colors.borderColor5,
    borderBottomWidth: Theme.responsiveSize.size01,
    paddingHorizontal: Theme.responsiveSize.size15,
    paddingVertical: Theme.responsiveSize.size10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appImage: {
    height: Theme.responsiveSize.size26,
    width: Theme.responsiveSize.size26,
  },
  appTitle: {
    flex: 1,
    marginHorizontal: Theme.responsiveSize.size08,
    fontSize: Theme.responsiveSize.size15,
    color: Theme.colors.textColor1,
    fontFamily: Theme.fonts.latoBold,
  },
  viewMR15: {
    marginRight: Theme.responsiveSize.size15,
  },
  preferenceIcon: {
    height: Theme.responsiveSize.size22,
    width: Theme.responsiveSize.size22,
  },
  profileIcon: {
    height: Theme.responsiveSize.size22,
    width: Theme.responsiveSize.size22,
  },
});

export default styles;
