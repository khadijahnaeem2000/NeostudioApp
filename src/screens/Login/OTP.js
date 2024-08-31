import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getOTPMobile, verifyMobileOTP } from '../../Redux/action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNOtpVerify from 'react-native-otp-verify';
import SmsRetriever from 'react-native-sms-retriever';
import { fonts } from '../../utils';
import BackgroundVideo from '../../Component/VideoBackhround';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { goBack } from '../../utils/naviagtion_service';
import { SvgXml } from 'react-native-svg';
import back_icon from '../../Images/icons/back_icon';

const OTP = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data } = route.params

  const { AuthLoading } = useSelector(state => state.user);

  const [isLoading, setLoading] = useState();
  const [code, setCode] = useState('');
  const inputEl = useRef(null);
  const [timerCount, setTimer] = useState(60);
  const [resend, setResend] = useState(true);

  const getOTPApi = async () => {
    setLoading(true);
    const result = await getOTPMobile(data.data.id, data.data.telephone);
    await setLoading(false);
  };

  useEffect(() => {
    // const smsListner = async () => {
    //   try {
    //     const registered = await SmsRetriever.startSmsRetriever();
    //     if (registered) {
    //       //alert('registered')
    //       SmsRetriever.addSmsListener(event => {
    //         if (event) {
    //           const otp = /(\d{6})/g.exec(event.message)[1];
    //           setCode(otp);
    //           //alert(JSON.stringify(otp));
    //           SmsRetriever.removeSmsListener();
    //         }
    //       });
    //     }
    //   } catch (error) {
    //   }
    // };
    // smsListner();
  }, []);

  useEffect(() => {
    RNOtpVerify.getHash()
      .then(code => console.log(code))
      .catch(console.log);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      inputEl.current?.focusField(0);
    }, 500);
  }, []);

  useEffect(() => {
    if (resend) {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  }, [resend]);

  useEffect(() => {
    if (timerCount == 0) {
      setResend(false);
    }
  }, [timerCount]);

  return (
    <BackgroundVideo >

      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          position: "absolute",
          zIndex: 100,
          top: 12,
          left: 20,
          height: 40,
          width: 40,
          justifyContent: "center",
        }}
        onPress={() => goBack()}
      >
        <SvgXml xml={back_icon} />
      </TouchableOpacity>
      <View style={styles.centerView}>
        {/* <ScrollView 
        showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        > */}
        <Text
          style={[styles.heading, {
            marginTop: heightPercentageToDP(2)
          }]} >
          CURSO DE INGRESO A GUARDIA CIVIL
        </Text>
        <Text
          style={[styles.heading, {
            marginTop: heightPercentageToDP(1)
          }]} >
          ¡30 DÍAS GRATIS!
        </Text>
        <Text
          style={[styles.heading, {
            marginTop: heightPercentageToDP(4)
          }]} >
          INTRODUCE EL CÓDIGO ENVIADO POR SMS
        </Text>

        <OTPInputView
          style={{ width: '100%', height: heightPercentageToDP(10), alignSelf: 'center' }}
          pinCount={6}
          placeholderTextColor='#fff'
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setCode(code)}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={num => {
            console.log('===>', num);
          }}
          selectionColor='white'
        />
        {code ? (
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              dispatch(verifyMobileOTP(data.data.id, code, data));
            }}>
            <FastImage
              source={require('../../Images/button.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.button}>
              <Text style={styles.btnText2}>{'Ingresar'}</Text>
            </FastImage>
          </TouchableOpacity>
        ) : null}
        <Text
          style={[
            styles.received,
            {
              marginVertical: heightPercentageToDP(2),
            },
          ]}>
          {'¿No recibiste ningún código?'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setTimer(60);
            setResend(true);
            getOTPApi();
          }}
          disabled={resend ? true : false}>
          <Text
            style={[
              styles.received,
              {
                marginVertical: heightPercentageToDP(0),
                fontFamily: fonts.novaBold,
                color: "#fff",
                fontSize: widthPercentageToDP(4),
              },
            ]}>
            {timerCount === 0 ? 'Reenviar código' : 'Reenviar código en ' + timerCount + ' segundos'}
          </Text>

        </TouchableOpacity>

        {isLoading && (
          <ActivityIndicator
            size={'large'}
            color="#000"
            style={styles.loading}
          />
        )}
        {AuthLoading && (
          <ActivityIndicator
            size={'large'}
            color="#000"
            style={styles.loading}
          />
        )}


        <View style={{ height: 20 }} />
        {/* </ScrollView> */}

      </View>
    </BackgroundVideo>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4),
    textAlign: "center"
  },
  centerView: {
    width: widthPercentageToDP(100),
    paddingHorizontal: 20,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(28),
    // position: "absolute",
    // bottom: "0%"
    //backgroundColor:"red"
  },
  logo: {
    position: 'absolute',
    right: '0%',
    top: '0%',
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
  },
  verify: {
    marginTop: heightPercentageToDP(-8),
    //marginVertical: heightPercentageToDP(3),
    //paddingLeft: widthPercentageToDP(),
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(6),
    color: 'black',
  },
  btnText2: {
    //marginVertical: heightPercentageToDP(3),
    //paddingLeft: widthPercentageToDP(),
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(6),
    color: 'white',
  },
  received: {
    //marginVertical: heightPercentageToDP(-3),
    //paddingLeft: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(4),
    color: '#fff',
    textAlign: 'center',
  },
  smallText: {
    marginVertical: heightPercentageToDP(-3),
    //paddingLeft: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(3.5),
    color: 'grey',
  },
  // borderStyleBase: {
  //     width: 40,
  //     height: 45,
  // },

  // borderStyleHighLighted: {
  //     borderColor: "#03DAC6",
  //     color:"black",
  // },

  underlineStyleBase: {
    width: widthPercentageToDP(13),
    height: heightPercentageToDP(7),
    borderWidth: widthPercentageToDP(0.2),
    borderColor: '#659ece',
    fontSize: widthPercentageToDP(8),
    color: 'white',
    fontFamily: fonts.novaRegular,
  },

  underlineStyleHighLighted: {
    width: widthPercentageToDP(13),
    height: heightPercentageToDP(7),
    borderWidth: widthPercentageToDP(0.2),
    borderColor: '#659ece',
    fontSize: widthPercentageToDP(8),
    color: 'black',
    fontFamily: fonts.novaRegular,
  },
  btn: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(7),
    backgroundColor: '#659ece',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(10),
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(4.5),
    color: 'white',
  },
  row: {
    marginTop: heightPercentageToDP(-2),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: widthPercentageToDP(16),
    height: widthPercentageToDP(16),
    borderRadius: widthPercentageToDP(16) / 2,
    backgroundColor: '#659ece',
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: heightPercentageToDP(5)
  },
  btnStyle: {
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(15),
    alignSelf: 'center',
    marginTop: heightPercentageToDP(1)
    //backgroundColor:"yellow"
  },
});

export default OTP;
