import { Platform, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  topView: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // width: '100%',
    // height: '15%',
    // marginLeft: widthPercentageToDP(2),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 12
  },
  playPauseView: {
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
    width: "35%",
    height: 60,
  },
  logo2: {
    width: heightPercentageToDP(55),
    height: widthPercentageToDP(12),
    //marginRight: heightPercentageToDP(2),
  },
  logoView: {
    flexDirection: 'row-reverse',
  },
  innerLogoView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  endReview: {
    marginLeft: widthPercentageToDP(2),
    marginRight: widthPercentageToDP(2),
  },
  endReviewText: {
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.elegance,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  middleView: {
    marginTop: heightPercentageToDP(1),
    marginLeft: widthPercentageToDP(3),
    marginRight: widthPercentageToDP(5),
    width: '100%',
    height: '91%',
    //flex
  },
  bottomView: {
    //flex: 0,
    // marginLeft: widthPercentageToDP(5),
    // alignItems:"center",
    //marginBottom: widthPercentageToDP(1)
    position: 'absolute',
    bottom: '1%',
    marginLeft: 20
  },
  btnImage: {
    width: 60,
    height: 60,
    marginLeft: 12,
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
  menuBtn: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    backgroundColor: 'red',
  },
  btnView: {
    width: '30%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: widthPercentageToDP(1),
  },
  menuButton: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
  },
  menuButton2: {
    width: heightPercentageToDP(10),
    height: heightPercentageToDP(10),
    //backgroundColor: 'yellow',
  },
  blockButton: {
    width: widthPercentageToDP(7),
    height: widthPercentageToDP(7),
    marginLeft: widthPercentageToDP(1),
  },
  blockButton2: {
    width: heightPercentageToDP(10),
    height: heightPercentageToDP(10),
    marginLeft: heightPercentageToDP(1),
    //backgroundColor: 'red',
  },
  modalMain2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  innerModal2: {
    // width: '100%',
    // height: '100%',
    //flex: 1,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    width: "100%",
  },
  navigation: {
    width: "70%",
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  navigationHeader: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: "flex-end"
  },
  loaderStyle: {
    width: widthPercentageToDP(8),
    height: widthPercentageToDP(8),
    marginRight: widthPercentageToDP(3),
  },
  mainModalView: {
    // marginTop: 20
  },
  jump: {
    height: widthPercentageToDP(50),
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 23,
    fontFamily: fonts.elegance,
    color: '#ffff',
    width: "30%",
  },
  timeValue: {
    fontSize: 26,
    fontFamily: fonts.novaBold,
    color: '#ffff',
    marginLeft: 40,
    width:"20%"
  },
  mnTime: {
    fontSize: 28,
    fontFamily: fonts.elegance,
    color: '#ffff',
    marginLeft: 6
  },
  timeValue2: {
    fontSize: 26,
    fontFamily: fonts.novaBold,
    color: '#ffff',
    width:"20%",

  },
  timeValue3: {
    width: widthPercentageToDP(5),
    fontSize: widthPercentageToDP(4.5),
    fontFamily: fonts.novaBold,
    color: '#ffff',
    marginLeft: widthPercentageToDP(5),
  },
  timeValue4: {
    width: widthPercentageToDP(6),
    fontSize: widthPercentageToDP(4.5),
    fontFamily: fonts.novaBold,
    color: '#ffff',
    marginLeft: widthPercentageToDP(10.5),
  },
  timeValue5: {
    width: widthPercentageToDP(6),
    fontSize: widthPercentageToDP(4.5),
    fontFamily: fonts.novaBold,
    color: '#ffff',
    marginLeft: widthPercentageToDP(10),
  },
  timeValue6: {
    width: widthPercentageToDP(6),
    fontSize: widthPercentageToDP(4.5),
    fontFamily: fonts.novaBold,
    color: '#ffff',
    marginLeft: widthPercentageToDP(5),
  },
  midView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rejectView: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.5)',
    justifyContent: "center"
  },
  rejectContainer: {
    width: "70%",
    height: "90%",
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
  },
  rejectBottom: {
    width: '100%',
    height: '18%',
    position: 'absolute',
    bottom: '0%',
    // borderTopWidth: heightPercentageToDP(0.2),
    // borderTopColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rejectBtn: {
    fontSize: 13,
    fontFamily: fonts.novaBold,
    color: '#ffff',
  },
  rejectDescription: {
    fontSize: 15,
    fontFamily: fonts.novaBold,
    color: '#000',
    paddingTop: 20,
    paddingLeft: 20,
  },
  listOptions: {
    width: "90%",
  },
  inputStyle: {
    width: "60%",
    height: 120,
    //marginTop: heightPercentageToDP(1),
    alignSelf: 'center',
    fontSize: 13,
    fontFamily: fonts.novaRegular,
    color: '#000',
  },
  optionsStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rejectItems: {
    fontSize: 15,
    fontFamily: fonts.novaRegular,
    color: '#000',
    marginLeft: 6,
  },
});
