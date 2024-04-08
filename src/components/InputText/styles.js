import { StyleSheet } from "react-native";
import Theme from "../../theme/Theme";


const styles = StyleSheet.create({
  viewMain:{
    marginBottom:Theme.responsiveSize.size13,
  },
  textSubTitle:{
    marginVertical:Theme.responsiveSize.size03,
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoMedium,
    color: Theme.colors.textColor5
  },
  viewBgInputText: {
    paddingHorizontal: Theme.responsiveSize.size10,
    borderRadius:Theme.responsiveSize.size03,
    borderWidth:Theme.responsiveSize.size01,
    borderColor:Theme.colors.borderColor4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput:{
    flex: 1,
    fontSize:Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoMedium,
    color:Theme.colors.textColor4,
  },
  imageIcon: {
    height: Theme.responsiveSize.size22,
    width: Theme.responsiveSize.size22,
  },
  textError:{
    marginTop:Theme.responsiveSize.size03,
    fontSize: Theme.responsiveSize.size11,
    fontFamily:Theme.fonts.latoMedium,
    color: 'red',
  },
})

export default styles;
