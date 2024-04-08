import { StyleSheet } from "react-native";
import Theme from "../../../theme/Theme";

const styles=StyleSheet.create({
    viewMainContainer:{
        height:'100%',
        width:'100%',
        backgroundColor:Theme.colors.appColor
    },
    container:{
        height:'100%',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Theme.colors.bgColor4
    },
    appImage:{
        height:Theme.responsiveSize.size85,
        width:Theme.responsiveSize.size85,
        marginBottom:Theme.responsiveSize.size08
    },
    textTitle:{
        fontSize:Theme.responsiveSize.size32,
        fontFamily: Theme.fonts.latoBlack,
        color:Theme.colors.textColor4
    },
    textSubTitle:{
        fontSize:Theme.responsiveSize.size14,
        fontFamily: Theme.fonts.latoSemibold,
        color:Theme.colors.textColor4
    },


})

export default styles;