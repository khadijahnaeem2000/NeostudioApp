import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';
import { COLORS, SIZES } from '../../constant';

export const styles = StyleSheet.create({
  headerTop: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(7),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? heightPercentageToDP(5) : 0
  },
  headerText: {
    fontSize: widthPercentageToDP(5.5),
    fontFamily: fonts.novaBold,
    color: COLORS.white,
    marginLeft: SIZES.padding
  },
  headerBtn: {
    marginLeft: widthPercentageToDP(2),
  },
  directoryView: {
    flex: 1,
    width: widthPercentageToDP(100),
  },
});
