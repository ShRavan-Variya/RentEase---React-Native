import { StyleSheet } from "react-native";
import Theme from "../../theme/Theme";


const styles = StyleSheet.create({
  viewSelect: {
    backgroundColor: Theme.colors.bgColor5,
    marginHorizontal: Theme.responsiveSize.size02,
    borderRadius: Theme.responsiveSize.size04,
    margin: Theme.responsiveSize.size02,
    marginRight: Theme.responsiveSize.size03,
    alignItems: 'center',
  },
  textSelect: {
    fontSize: Theme.responsiveSize.size11,
    fontFamily:Theme.fonts.latoRegular,
    color: Theme.colors.textColor5,
    marginHorizontal: Theme.responsiveSize.size05,
    margin: Theme.responsiveSize.size03,
  },
 
})

export default styles;
