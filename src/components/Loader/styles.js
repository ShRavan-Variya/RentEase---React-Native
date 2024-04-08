import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewLoader: {
    backgroundColor: Theme.colors.white,
    height: Theme.responsiveSize.size80,
    width: Theme.responsiveSize.size80,
    borderRadius: Theme.responsiveSize.size20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;