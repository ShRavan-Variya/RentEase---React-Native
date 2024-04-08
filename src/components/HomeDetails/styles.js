import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const {width} = Dimensions.get('window')
const cardWidth = width / 2 - Theme.responsiveSize.size20

const styles = StyleSheet.create({
  textTitle:{
    flex:1,
    fontSize:Theme.responsiveSize.size18,
    fontFamily:Theme.fonts.latoBold,
    color:Theme.colors.textColor3,
    marginBottom: Theme.responsiveSize.size08,
  },
  viewFWrap:{
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewMain: {
    width: cardWidth,
    marginVertical: Theme.responsiveSize.size05,
  },
  textTitleItem:{
    fontSize: Theme.responsiveSize.size14,
    fontFamily:Theme.fonts.latoBold,
    color: Theme.colors.textColor6,
  },
  textSubTitle:{
    fontSize: Theme.responsiveSize.size12,
    fontFamily:Theme.fonts.latoBold,
    marginVertical: Theme.responsiveSize.size04,
    color: Theme.colors.textColor4,
  },
  editIcon:{
    height:Theme.responsiveSize.size22,
    width:Theme.responsiveSize.size22
  },
  viewRow:{
    flexDirection:'row',
    alignItems: 'center',
  },
  textError:{
    marginHorizontal: Theme.responsiveSize.size02,
    marginTop:Theme.responsiveSize.size03,
    fontSize: Theme.responsiveSize.size11,
    fontFamily:Theme.fonts.latoMedium,
    color: 'red',
  },
});

export default styles;
