import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { RFValue } from 'react-native-responsive-fontsize';

export const isIOS = Platform.OS === 'ios';

export const behaviour = isIOS ? 'padding' : "height"

export const COLORS = {
  text_black_color: "#1E1E1E",
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
};


export const SIZES = {
  // global sizes
  padding: 20,
  padding2: 12,

  // font sizes
  h7: RFValue(7),
  h8: RFValue(8),
  h9: RFValue(9),
  h10: RFValue(10),
  h11: RFValue(11),
  h12: RFValue(12),
  h13: RFValue(13),
  h14: RFValue(14),
  h15: RFValue(15),
  h16: RFValue(16),
  h17: RFValue(17),
  h18: RFValue(18),
  h19: RFValue(19),
  h20: RFValue(20),
  h22: RFValue(22),
  h28: RFValue(28),
  h32: RFValue(32),
  h38: RFValue(38),

  // app dimensions
  width,
  height,
};


const appTheme = { COLORS, SIZES };

export default appTheme;
