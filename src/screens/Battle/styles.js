import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import {fonts} from '../../utils';
import { COLORS } from '../../constant';

export const styles = StyleSheet.create({
  btn: {
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(2),
  },
  btnTxt: {
    fontSize: widthPercentageToDP(6.5),
    fontFamily: fonts.novaBold,
    color: COLORS.white,
  },
  createBtn: {
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(17),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // position: "absolute",
    // bottom: "1%",
    // zIndex: 3
    //backgroundColor: "red"
  },
  createBtn: {
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(17),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // position: "absolute",
    // bottom: "1%",
    // zIndex: 3
    //backgroundColor: "red"
  },
  // =============
  folderView: {
    width: widthPercentageToDP(90),
    marginLeft: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
  },
  vectorIcon3: {
    width: widthPercentageToDP(8.5),
    height: widthPercentageToDP(8.5),
  },
  vectorIcon2: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
  },
  folderName: {
    marginLeft: widthPercentageToDP(6),
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.elegance,
    color: COLORS.white,
  },
  vectorIcon: {
    width: widthPercentageToDP(6),
    height: widthPercentageToDP(6),
  },
  operator: {
    fontSize: widthPercentageToDP(8),
    fontFamily: fonts.novaBold,
    color: COLORS.white,
  },
  operatorTxt: {
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    color: COLORS.white,
  },
  box: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    //borderRadius: widthPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    width: widthPercentageToDP(13),
    height: widthPercentageToDP(12),
    //borderRadius: widthPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
