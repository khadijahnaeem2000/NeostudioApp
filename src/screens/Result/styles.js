import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';
import { SIZES } from '../../constant';
import { isIOS } from '../../constant/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: isIOS ? SIZES.padding * 2 : SIZES.padding
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
  logo: {
    width: "30%",
    height: SIZES.padding * 2,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: SIZES.h16,
    fontFamily: fonts.elegance,
    color: '#000',
    textAlign: 'center',
  },
  centerView: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  centerLeftView: {
    flex: 1,
    height: '100%',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.padding2 * 1.5,
  },
  textUnBold: {
    fontSize: SIZES.h14,
    fontFamily: fonts.elegance,
    color: '#000',
    textAlign: "left",
    width: "40%"
  },
  smallText: {
    fontSize: SIZES.h8,
    fontFamily: fonts.elegance,
    color: '#000',
  },
  textUnBold3: {
    fontSize: SIZES.h17,
    fontFamily: fonts.novaBold,
    color: '#000',
    width: "40%"
  },
  textBold: {
    fontSize: SIZES.h12,
    fontFamily: fonts.novaBold,
    color: '#000',
    textAlign: "left"
  },
  textBold3: {
    fontSize: SIZES.h15,
    fontFamily: fonts.novaBold,
    color: '#000',
  },
  centerMainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  graphMain: {
    width: SIZES.padding * 3.5,
    height: '100%',
  },
  graphView: {
    width: '100%',
    position: 'absolute',
    bottom: '0%',
  },
  graphText: {
    fontSize: SIZES.h13,
    fontFamily: fonts.novaBold,
    color: '#000',
    position: 'absolute',
    bottom: '0%',
    left: '30%',
  },
  graphHeight: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    bottom: '30%',
  },
  graphBottom: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphImage: {
    width: SIZES.padding,
    height: SIZES.padding,
  },

  centerRightView: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  revisar_btn: {
    width: SIZES.padding * 9,
    height: SIZES.padding * 3,
  },
  salir_btn: {
    width: SIZES.padding * 9,
    height: SIZES.padding * 3,
  },
  bottomView: {
    marginBottom: SIZES.padding2 / 2,
    marginTop: SIZES.padding2,
  },
  passFailView: {
    position: 'absolute',
    bottom: '2%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText2: {
    fontSize: heightPercentageToDP(6),
    fontFamily: fonts.novaBold,
    color: '#000',
  },
  nullText: {
    fontSize: heightPercentageToDP(4),
    fontFamily: fonts.novaBold,
    color: '#000',
  },


});
