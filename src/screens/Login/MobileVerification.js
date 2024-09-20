import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { fonts } from '../../utils';
import PhoneInput from 'react-native-phone-number-input';
import BackgroundVideo from '../../Component/VideoBackhround';
import { getOTPMobile } from '../../Redux/action';
import { navigate } from '../../utils/naviagtion_service';


const MobileVerification = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data } = route.params
  const inputEl = useRef(null);


  const { AuthLoading } = useSelector(state => state.user);



  const [isLoading, setLoading] = useState();
  const [formattedValue, setFormattedValue] = useState();
  const [phoneNum, setPhoneNum] = useState('')

  // useEffect(() => {
  //   const smsListner = async () => {
  //     try {
  //       const registered = await SmsRetriever.startSmsRetriever();
  //       if (registered) {
  //         //alert('registered')
  //         SmsRetriever.addSmsListener(event => {
  //           if (event) {
  //             const otp = /(\d{6})/g.exec(event.message)[1];
  //             setCode(otp);
  //             //alert(JSON.stringify(otp));
  //             SmsRetriever.removeSmsListener();
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       //alert(JSON.stringify(error));
  //     }
  //   };
  //   smsListner();
  //   // return () => SmsRetriever.removeSmsListener();
  // }, []);


  const onPressVerification = async () => {
    // setLoading(true);
    const result = await getOTPMobile(data?.data?.id, phoneNum);
    console.log("Resultttt", result)
    if (result?.status === 201) {
      alert(result?.message)
    } else {
      navigate('OTP', {
        type: false,
        data: {
          data:
            { id: data?.data?.id, telephone: phoneNum }
        }
      })
    }
  }



  return (
    <BackgroundVideo

    >
      <View style={styles.centerView}>
        <Text
          style={[styles.heading, {
            marginTop: heightPercentageToDP(3)
          }]} >
          CURSO DE INGRESO A GUARDIA CIVIL
        </Text>


        <Text
          style={[styles.heading, {
            marginTop: heightPercentageToDP(1)
          }]} >
          ¡48 HORAS GRATIS!
        </Text>
        <Text
          style={[styles.heading, {
            marginTop: heightPercentageToDP(6)
          }]} >
          INTRODUCE TU TELÉFONO
        </Text>


        <FastImage
          style={styles.loginSection2}
          source={require('../../Images/txt_box.png')}
          resizeMode={FastImage.resizeMode.stretch}>

          <PhoneInput
            disableArrowIcon={true}
            countryPickerProps={{
              visible: false,
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              width: widthPercentageToDP(90),
              height: heightPercentageToDP(10),
            }}
            textInputStyle={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(10),
              color: '#000',
              fontSize: widthPercentageToDP(5),
              fontFamily: fonts.novaBold,
              //fontFamily: "Nexa-Light",
            }}
            textContainerStyle={{
              backgroundColor: 'transparent',
              color: '#707070',
              width: widthPercentageToDP(70),
              height: heightPercentageToDP(10),
              fontSize: widthPercentageToDP(5),
              fontFamily: fonts.novaBold,
            }}
            codeTextStyle={{
              color: '#707070',
              fontSize: widthPercentageToDP(5),
              fontFamily: fonts.novaBold,
            }}
            textInputProps={{
              placeholderTextColor: '#707070',
            }}
            defaultValue={phoneNum}
            defaultCode="ES"
            layout="first"
            onChangeText={text => {
              setPhoneNum(text)
              //setPhoneNo(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text)
            }}
            withDarkTheme={false}
            withShadow
            //autoFocus
            placeholder={'Teléfono móvil'}
            flagButtonStyle={{
              marginLeft: widthPercentageToDP(4),
            }}
            countryPickerButtonStyle={{
              // backgroundColor:"red",
              width: widthPercentageToDP(15),
              height: heightPercentageToDP(10),
              alignItems: 'center',
            }}
          />

        </FastImage>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            if (phoneNum == '' || phoneNum.length == 0) {
              Alert.alert('Enter a correct mobile number')
            } else {
              onPressVerification()

            }
          }}>
          <FastImage
            source={
              data?.data?.appleid ? require("./assets/Verificar_apple_telefone.png") :
                require('./assets/Verificar_telefono.png')
            }
            resizeMode={FastImage.resizeMode.contain}
            style={styles.button}
          />
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
      </View>
    </BackgroundVideo>
  );
};

const styles = StyleSheet.create({

  centerView: {
    width: widthPercentageToDP(85),
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(28),
    // position: "absolute",
    // bottom: "0%"
    //backgroundColor:"red"
  },
  heading: {
    color: "#fff",
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4),
    textAlign: "center"
  },
  verify: {
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
    fontSize: widthPercentageToDP(3.5),
    color: 'grey',
    textAlign: 'center',
    // backgroundColor: 'red',

  },
  smallText: {
    marginVertical: heightPercentageToDP(-3),
    //paddingLeft: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(3.5),
    color: 'grey',
  },


  underlineStyleBase: {
    width: widthPercentageToDP(13),
    height: heightPercentageToDP(10),
    borderWidth: widthPercentageToDP(0.2),
    borderColor: '#659ece',
    fontSize: widthPercentageToDP(8),
    color: 'black',
    fontFamily: fonts.novaRegular,
  },

  underlineStyleHighLighted: {
    width: widthPercentageToDP(13),
    height: heightPercentageToDP(10),
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
    marginTop: heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(90),
    height: widthPercentageToDP(20),
    // alignSelf: 'center',
    //backgroundColor:"yellow"
    // marginTop: heightPercentageToDP(-2),
  },
});

export default MobileVerification;
