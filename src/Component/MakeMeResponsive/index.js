import { Dimensions, PixelRatio } from "react-native";
import DeviceInfo from 'react-native-device-info'

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const REFERENCE_WIDTH = 375;  // Base width for scaling (change if needed)
const REFERENCE_HEIGHT = 812;

const widthPercentageToDP = (widthPercent) => {
  const isTablet = DeviceInfo.isTablet();
  // if (isTablet) {
  //   const elemWidth = parseFloat(widthPercent);
  //   const widthScale = screenWidth / REFERENCE_WIDTH;
  //   return PixelRatio.roundToNearestPixel((elemWidth * widthScale));
  // } else {
    const screenWidth = Dimensions.get("screen").width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  // }
};
const heightPercentageToDP = (heightPercent) => {
  const isTablet = DeviceInfo.isTablet();
  // if (isTablet) {
  //   const elemHeight = parseFloat(heightPercent);
  //   const heightScale = screenHeight / REFERENCE_HEIGHT;
  //   return PixelRatio.roundToNearestPixel((elemHeight * heightScale));
  // } else {
    const screenHeight = Dimensions.get("screen").height;
      // Convert string input to decimal number
      const elemHeight = parseFloat(heightPercent);
      return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  // }
};

export { widthPercentageToDP, heightPercentageToDP };