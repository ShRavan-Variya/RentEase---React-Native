import { StyleSheet } from "react-native";
import Theme from "../../theme/Theme";

const THUMB_RADIUS_LOW = 12;

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 1.2,
    height: THUMB_RADIUS_LOW * 1.2,
    borderRadius: THUMB_RADIUS_LOW,
    backgroundColor: Theme.colors.bgColor1,
  },
  root: {
    height:Theme.responsiveSize.size01,
    backgroundColor: Theme.colors.bgColor1,
    borderRadius: Theme.responsiveSize.size01,
  },
  rail: {
    flex: 1,
    height: Theme.responsiveSize.size01,
    borderRadius: Theme.responsiveSize.size01,
    backgroundColor: Theme.colors.bgColor3,
  },
  label: {
    alignItems: 'center',
    padding: Theme.responsiveSize.size08,
    backgroundColor: Theme.colors.bgColor1,
    borderRadius: Theme.responsiveSize.size04,
  },
  textLabel: {
    fontSize: Theme.responsiveSize.size15,
    color: Theme.colors.textColor2,
  },
})

export default styles;
