import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const {width} = Dimensions.get('window');
const imageSize = (width - Theme.responsiveSize.size52) / 4;

const styles = StyleSheet.create({
  viewMain: {
    marginVertical: Theme.responsiveSize.size08,
  },
  textTitle:{
    fontSize:Theme.responsiveSize.size18,
    fontWeight:'500',
    color:Theme.colors.textColor3,
    marginBottom: Theme.responsiveSize.size10,
    marginLeft: Theme.responsiveSize.size15,
  },
  viewFWrap:{
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems: 'center',
    marginHorizontal: Theme.responsiveSize.size14,
  },
  viewOuter: {
    height: imageSize,
    width: imageSize,
    alignItems: 'center',
    justifyContent: 'center',
    margin:Theme.responsiveSize.size03,
    borderWidth: Theme.responsiveSize.size01 + 0.8,
    borderColor: Theme.colors.borderColor1,
    borderRadius: Theme.responsiveSize.size03,
    borderStyle: 'dashed',
  },
  imageIndex0: {
    height: Theme.responsiveSize.size20,
    width: Theme.responsiveSize.size20,
  },
  homeImage:{
    height: imageSize,
    width: imageSize,
    margin:Theme.responsiveSize.size03,
    overflow: 'hidden',
  },
  linearGradient: {
    height: imageSize,
    width: imageSize,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderRadius: Theme.responsiveSize.size03
  },
  deleteIconContainer: {
    margin: Theme.responsiveSize.size08,
    height: Theme.responsiveSize.size18,
    width: Theme.responsiveSize.size18,
  },
  textError:{
    marginHorizontal: Theme.responsiveSize.size15,
    marginTop:Theme.responsiveSize.size03,
    fontSize: Theme.responsiveSize.size11,
    fontFamily:Theme.fonts.latoMedium,
    color: 'red',
  },
});

export default styles;
