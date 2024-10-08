import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginLeft: widthPercentageToDP(2),
    //marginRight: widthPercentageToDP(2),
  },
  playPauseView: {
    width: widthPercentageToDP(30),
    flexDirection: 'row',
  },
  timerView: {
    width: widthPercentageToDP(30),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: widthPercentageToDP(5),
    fontFamily: fonts.elegance,
    color: '#000',
    textAlign: 'center',
  },
  logo: {
    width: widthPercentageToDP(55),
    height: widthPercentageToDP(13),
  },
  logoView: {
    width: widthPercentageToDP(55),
    height: widthPercentageToDP(13),
  },
  middleView: {
    //marginTop: heightPercentageToDP(1),
    marginLeft: widthPercentageToDP(3),
    marginRight: widthPercentageToDP(5),
    width: '100%',
    height: '90%',
    //flex
  },
  bottomView: {
    //flex: 0,
    // marginLeft: widthPercentageToDP(5),
    // alignItems:"center",
    //marginBottom: widthPercentageToDP(1)
    flex: 1,
    position: 'absolute',
    bottom: '4%',
    marginLeft: widthPercentageToDP(2),
    marginRight: widthPercentageToDP(2),
    //backgroundColor:"red"
  },
  inner: {
    width: '100%',
    height: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(3),
    backgroundColor: 'green',
    position: 'absolute',
    bottom: '1%',
    marginLeft: widthPercentageToDP(5),
    marginStart: widthPercentageToDP(5),
    //alignItems:"center"
  },
  btnImage: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    marginLeft: widthPercentageToDP(1),
  },
  btnImage2: {
    width: widthPercentageToDP(9),
    height: widthPercentageToDP(9),
    marginLeft: widthPercentageToDP(1),
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
  modalMain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal: {
    width: '100%',
    height: '100%',
    marginBottom: widthPercentageToDP(10),
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
  },
  crossBtn: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(10) / 2,
    backgroundColor: '#cccccc',
    marginLeft: widthPercentageToDP(5),
    marginTop: widthPercentageToDP(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackStyle: {
    // backgroundColor: "#6A6B6F",
    // height: heightPercentageToDP(10),
    // borderRadius: widthPercentageToDP(2),
    // borderBottomWidth: widthPercentageToDP(1),
    // borderBottomColor: "#ffffff"
  },
  sliderStyle: {
    height: '4%',
    width: '100%',
    marginLeft: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(1),
    marginTop: heightPercentageToDP(1),
  },
});
