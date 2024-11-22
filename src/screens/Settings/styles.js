import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';
import { COLORS, SIZES } from '../../constant';

export const styles = StyleSheet.create({
  mainTitle: {
    fontSize: widthPercentageToDP(6),
    color: COLORS.white,
    fontFamily: fonts.novaBold,
    textAlign: 'center'
  },
  rowView: {
    marginTop: heightPercentageToDP(4),
    height: heightPercentageToDP(7),
    paddingHorizontal: SIZES.padding,
    //alignSelf:"center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
    //backgroundColor:"red"
  },
  itemTitle: {
    fontSize: widthPercentageToDP(4.5),
    color: COLORS.white,
    fontFamily: fonts.novaBold,
  },
  btn: {
    width: "33%",
    height: SIZES.padding * 1.5,
  },
  btn_text: {
    fontSize: widthPercentageToDP(3.5)
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
