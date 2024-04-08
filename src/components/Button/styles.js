import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewMain: {
    marginHorizontal: Theme.responsiveSize.size15,
    marginVertical: Theme.responsiveSize.size12,
  },
  button: {
    backgroundColor: Theme.colors.bgColor1,
    alignItems: 'center',
    borderRadius: Theme.responsiveSize.size04,
  },
  buttonText: {
    fontSize: Theme.responsiveSize.size15,
    fontFamily:Theme.fonts.latoBlack,
    color: Theme.colors.textColor2,
    paddingVertical: Theme.responsiveSize.size12,
  },
});

export default styles;
