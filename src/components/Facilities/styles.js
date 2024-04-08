import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  viewFacilities: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.responsiveSize.size05,
  },
  viewMainStyle:{
    marginBottom:0
  },
  bgStyle: {
    borderColor: Theme.colors.borderColor4,
    borderRadius: Theme.responsiveSize.size03,
    borderWidth: Theme.responsiveSize.size01,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: Theme.responsiveSize.size14,
    fontFamily: Theme.fonts.latoMedium,
    color: Theme.colors.textColor4,
  },
  bgStyleOfText: {
    fontSize: Theme.responsiveSize.size14,
    fontFamily: Theme.fonts.latoMedium,
    color: Theme.colors.textColor4,
    paddingVertical: Theme.responsiveSize.size12,
    paddingHorizontal: Theme.responsiveSize.size13,
    borderRadius: Theme.responsiveSize.size03,
    borderWidth: Theme.responsiveSize.size01,
    borderColor: Theme.colors.borderColor4,
  },
  marginH12: {
    marginHorizontal: Theme.responsiveSize.size12
  },
  deleteRedIcon: {
    height: Theme.responsiveSize.size20,
    width: Theme.responsiveSize.size20,
  },
  plusIcon: {
    height: Theme.responsiveSize.size20,
    width: Theme.responsiveSize.size20,
  },
  textError:{
    fontSize: Theme.responsiveSize.size11,
    fontFamily:Theme.fonts.latoMedium,
    color: 'red',
  },
});

export default styles;
