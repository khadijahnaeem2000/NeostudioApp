import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { userLogin, dispatchFunc, updateOrientation, userAppleLogin } from '../../Redux/action';
import { styles } from './styles';
import validator from 'validator';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import RNRestart from 'react-native-restart';
import { NetworkInfo } from 'react-native-network-info';
import { getReasons } from '../../Redux/action';
import BackgroudVideo from '../../Component/VideoBackhround';
import { fonts } from '../../utils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from "@invertase/react-native-apple-authentication";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchBtn: false,
      email: '',
      emailError: '',
      telephone: '',
      telephoneError: '',
      userName: '',
      userNameError: '',
      password: '',
      passwordError: '',
      isOpen: false,
      ipAddress: '',
      isLoading: false,
      reasons: [],
      myReason: '',
      formattedValue: '',
      phoneNo: '',
      isChecked: false,
    };
    this.getIPAddress();
    this.phoneInput = null;
  }



  componentDidMount() {
    this.handleNotificationPermission()
    //RNRestart.Restart();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  setModalVisible(visible) {
    this.setState({ isOpen: visible });
  }

  socialLoginApi = async (givenName, familyName, email, uid) => {
    // setLoading(true);
    this.props.userLogin('social', {
      FirstName: givenName,
      LastName: familyName,
      LoginType: "Google",
      ipaddress: null,
      appleID: null,
      email: email
    });

    // this.props.SocialLoginUser(givenName, familyName, email);
    // console.log("🚀 ~ Login ~ socialLoginApi= ~ result:", result)
    // if (result?.status == 'Sucessfull') {
    //   if (result?.is_verified == 'no') {

    //   }
    // }
  };

  googleSignInHandler = async () => {
    // await GoogleSignin.signOut()
    // await GoogleSignin.revokeAccess()
    try {
      const isGoogleSignin = await GoogleSignin.hasPreviousSignIn()
      const googleuser = await GoogleSignin.getCurrentUser()
      console.log("SAdasdsadasdasdas", isGoogleSignin, googleuser)
      if (isGoogleSignin) {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      }
    } catch (error) {
      console.log("errorrr", error)
    }


    this.setState({ isLoading: true })
    try {
      await GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '1058215598914-8hrhll0vrokh5mvncfgi83uaqvqvj1t8.apps.googleusercontent.com',
        offlineAccess: true,
      });
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { user } = await GoogleSignin.signIn();
      console.log("🚀 ~ Login ~ googleSignInHandler= ~ userInfo:", user)
      // console.log('my data is ==>', userInfo);
      this.setState({ isLoading: false })
      this.socialLoginApi(
        user?.givenName,
        user?.familyName,
        user?.email,
      );
    } catch (error) {
      this.setState({ isLoading: false })
      console.log(error);
    }
  };
  appleSignInHandler = async () => {
    this.setState({ isLoading: true })

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      )
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const data = appleAuthRequestResponse
        // const apiData = {
        //     uid: user,
        //     provider: "apple"
        // }
        this.setState({ isLoading: false })
        this.props.userAppleLogin(
          data?.fullName?.givenName,
          data?.email,
          data?.user,
        );
      }

    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false })
    }
  };

  onchangeUserName = text => {
    if (validator.isEmpty(text)) {
      this.setState({ userNameError: 'Código de estudiante requerido' });
    } else {
      this.setState({ userNameError: '' });
    }
    this.setState({ userName: text });
  };

  onchangePassword = text => {
    if (validator.isEmpty(text)) {
      this.setState({ passwordError: 'se requiere contraseña' });
    } else {
      this.setState({ passwordError: '' });
    }
    this.setState({ password: text });
  };

  onchangeEmail = text => {
    if (validator.isEmpty(text)) {
      this.setState({ emailError: 'Correo electronico es requerido' });
    } else {
      this.setState({ emailError: '' });
    }
    this.setState({ email: text });
  };

  onchangeTelephone = text => {
    if (validator.isEmpty(text)) {
      this.setState({ telephoneError: 'Se requiere telefono' });
    } else {
      this.setState({ telephoneError: '' });
    }
    this.setState({ telephone: text });
  };

  loginHandler = () => {
    const validNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (this.state.switchBtn) {
      if (validator.isEmpty(this.state.userName)) {
        return Alert.alert('', 'Código de estudiante requerido');
      }
      if (validator.isEmpty(this.state.password)) {
        return Alert.alert('', 'se requiere contraseña');
      }
      //   if (!this.state.isChecked) {
      //     return Alert.alert(
      //       '',
      //       'Por favor acepte el enlace de política de privacidad',
      //     );
      //   }
      this.props.userLogin('true', this.state.userName, this.state.password);
    } else {
      const checkValid = this.phoneInput.isValidNumber(this.state.phoneNo);
      if (!validator.isEmail(this.state.email)) {
        return Alert.alert('', 'Correo electronico es requerido');
      }
      if (!checkValid) {
        return Alert.alert(
          '',
          'Se requiere telefonoIngrese un número de teléfono correcto, sin +34. por ejemplo 621112233',
        );
      }
      if (!this.state.isChecked) {
        return Alert.alert(
          '',
          'Por favor acepte el enlace de política de privacidad',
        );
      }
      // if (!this.state.myReason) {
      //     return Alert.alert('', "Por favor seleccione la razón primero")
      // }
      //console.log('My number =>', this.state.phoneNo)
      this.props.userLogin(
        'false',
        this.state.phoneNo,
        this.state.email,
        this.state.myReason,
      );
    }
  };

  _onLayout = e => {
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };

  updateScreen = () => {
    const { orientation } = this.props.user;
    this.props.updateOrientation(true);

    if (!orientation) {
      RNRestart.Restart();
    }
  };
  getIPAddress = async () => {
    await NetworkInfo.getIPAddress().then(ipAddress => {
      console.log(ipAddress);
      this.setState({ ipAddress: ipAddress });
    });
  };

  getAllReasons = async () => {
    this.setState({ isLoading: true });
    const result = await getReasons();
    await this.setState({ reasons: result });
    await this.setState({ isLoading: false });
  };
  handleNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'PUSH NOTIFICATIONS PERMISSION',
            message: 'Neoestudio want to send you PUSH NOTIFICATIONS',

            buttonNegative: 'Cancel',
            buttonPositive: 'Ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('GRANTED');
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  render() {
    const { login, AuthLoading } = this.props.user;
    const { isLoading, reasons, myReason, phoneNo, formattedValue } = this.state;
    const { isDialogOpen, errorMessage } = this.props.dialog;
    return (
      <BackgroudVideo
      // source={require('./assets/bg2.jpg')}
      // style={styles.container}
      // resizeMode={FastImage.resizeMode.stretch}
      >
        <View style={styles.loginView}>
          {/* <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
          <View
            style={{ marginTop: heightPercentageToDP(30), alignSelf: 'center' }}>
            <View
              style={{ width: widthPercentageToDP(100), alignItems: 'center' }}>
              <View style={styles.version}>
                {/* <Text style={styles.versionText}>
                                        {"Versión:"}
                                    </Text> */}

                {!this.state.switchBtn &&
                  <Text style={styles.heading}  >
                    {"CURSO DE INGRESO A GUARDIA CIVIL\n30 DÍAS GRATIS"}
                  </Text>
                }


                <TouchableOpacity
                  onPress={() =>
                    this.state.switchBtn
                      ? this.setState({
                        switchBtn: false,
                        email: '',
                        telephone: '',
                      })
                      : this.setState({
                        switchBtn: true,
                        userName: '',
                        password: '',
                      })
                  }
                  style={{
                    alignSelf: 'center',
                    // backgroundColor:'red',
                    marginRight: widthPercentageToDP(9),
                    marginTop: this.state.switchBtn ? heightPercentageToDP(5) : heightPercentageToDP(5)
                  }}>
                  <FastImage
                    source={
                      this.state.switchBtn
                        ? require('./assets/switch_on.png')
                        : require('./assets/switch_off.png')
                    }
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.switch}>
                    <Text
                      style={[
                        styles.switchText,
                        {
                          marginRight: this.state.switchBtn ? 30 : 0,
                          marginLeft: !this.state.switchBtn ? 20 : 0,
                          marginTop: !this.state.switchBtn ? 0 : 5,
                        },
                      ]}>
                      {this.state.switchBtn ? 'Alumnos' : 'Prueba'}
                    </Text>
                  </FastImage>
                </TouchableOpacity>
                {/* <TouchableOpacity
                                    onPress={() => this.setState({ isOpen: true })}>
                                    <Text style={styles.quesText}>
                                        {"?"}
                                    </Text>
                                </TouchableOpacity> */}
              </View>
            </View>
            {this.state.switchBtn ? (
              <View
                style={{
                  width: widthPercentageToDP(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  style={styles.loginSection}
                  source={require('../../Images/txt_box.png')}
                  resizeMode={FastImage.resizeMode.stretch}>
                  <FastImage
                    source={require('./assets/user.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.user}
                  />

                  <TextInput
                    placeholder="Nombre de usuario"
                    placeholderTextColor="#707070"
                    onChangeText={this.onchangeUserName}
                    keyboardType="email-address"
                    value={this.state.userName}
                    //containerStyle={styles.input}
                    errorMessage={this.state.userNameError}
                    //inputContainerStyle={styles.inputConatiner}
                    //inputStyle={styles.inputStyles}
                    //placeholderStyle={styles.placeHolderStyles}
                    textAlign={'center'}
                    style={styles.input}
                  />
                </FastImage>
                <FastImage
                  style={[
                    styles.loginSection,
                    { marginTop: heightPercentageToDP(-1) },
                  ]}
                  source={require('../../Images/txt_box.png')}
                  resizeMode={FastImage.resizeMode.stretch}>
                  <FastImage
                    source={require('./assets/password.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.password}
                  />

                  <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#707070"
                    onChangeText={this.onchangePassword}
                    secureTextEntry={true}
                    value={this.state.password}
                    //containerStyle={styles.input}
                    errorMessage={this.state.passwordError}
                    //inputContainerStyle={styles.inputConatiner}
                    //placeholderStyle={styles.placeHolderStyles}
                    //inputStyle={styles.inputStyles}
                    textAlign={'center'}
                    style={styles.input}
                  />
                </FastImage>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.btnStyle}
                  onPress={this.googleSignInHandler}>
                  <FastImage
                    source={
                      require('./assets/Iniciar_con_Google_Icon.png')
                    }
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.button}
                  />
                </TouchableOpacity>
                {
                  Platform.OS === 'ios' &&
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={this.appleSignInHandler}>
                    <FastImage
                      source={
                        require('./assets/Iniciar_con_Apple_Icon.png')
                      }
                      resizeMode={FastImage.resizeMode.contain}
                      style={styles.button}
                    />
                  </TouchableOpacity>
                }
              </>
              // <View
              //   style={{ width: widthPercentageToDP(100), alignItems: 'center' }}>
              //   <FastImage
              //     style={styles.loginSection}
              //     source={require('../../Images/txt_box.png')}
              //     resizeMode={FastImage.resizeMode.stretch}>
              //     <FastImage
              //       source={require('./assets/email.png')}
              //       resizeMode={FastImage.resizeMode.contain}
              //       style={styles.email}
              //     />

              //     <TextInput
              //       placeholder="Email"
              //       placeholderTextColor="#707070"
              //       onChangeText={this.onchangeEmail}
              //       keyboardType="email-address"
              //       value={this.state.email}
              //       //containerStyle={styles.input}
              //       errorMessage={this.state.emailError}
              //       //inputContainerStyle={styles.inputConatiner}
              //       //placeholderStyle={styles.placeHolderStyles}
              //       //inputStyle={styles.inputStyles}
              //       textAlign={'center'}
              //       style={styles.input}
              //     />
              //   </FastImage>
              //   <FastImage
              //     style={styles.loginSection2}
              //     source={require('../../Images/txt_box.png')}
              //     resizeMode={FastImage.resizeMode.stretch}>
              //     <PhoneInput
              //       ref={ref => (this.phoneInput = ref)}
              //       disableArrowIcon={true}
              //       countryPickerProps={{
              //         visible: false,
              //       }}
              //       containerStyle={{
              //         backgroundColor: 'transparent',
              //         width: widthPercentageToDP(90),
              //         height: heightPercentageToDP(7),
              //       }}
              //       textInputStyle={{
              //         width: widthPercentageToDP(80),
              //         height: heightPercentageToDP(7),
              //         color: '#000',
              //         fontSize: widthPercentageToDP(4.5),
              //         fontFamily: fonts.novaBold,
              //         //fontFamily: "Nexa-Light",
              //       }}
              //       textContainerStyle={{
              //         backgroundColor: 'transparent',
              //         color: '#707070',
              //         width: widthPercentageToDP(70),
              //         height: heightPercentageToDP(7),
              //         fontSize: widthPercentageToDP(4.5),
              //         fontFamily: fonts.novaBold,
              //       }}
              //       codeTextStyle={{
              //         color: '#707070',
              //         fontSize: widthPercentageToDP(4.5),
              //         fontFamily: fonts.novaBold,
              //       }}
              //       textInputProps={{
              //         placeholderTextColor: '#707070',
              //       }}
              //       defaultValue={phoneNo}
              //       defaultCode="ES"
              //       layout="first"
              //       onChangeText={text => {
              //         this.setState({ phoneNo: text });
              //         //setPhoneNo(text);
              //       }}
              //       onChangeFormattedText={text => {
              //         this.setState({ formattedValue: text });
              //         //setFormattedValue(text);
              //       }}
              //       withDarkTheme={false}
              //       withShadow
              //       //autoFocus
              //       placeholder={'Teléfono móvil'}
              //       flagButtonStyle={{
              //         marginLeft: widthPercentageToDP(4),
              //       }}
              //       countryPickerButtonStyle={{
              //         //backgroundColor:"red",
              //         width: widthPercentageToDP(12),
              //         height: heightPercentageToDP(6.5),
              //         alignItems: 'center',
              //       }}
              //     />
              //     {/* <FastImage
              //                               source={require('./assets/telephone.png')}
              //                               resizeMode={FastImage.resizeMode.contain}
              //                               style={styles.telphone}
              //                           />

              //                           <TextInput
              //                               placeholder="Teléfono"
              //                               placeholderTextColor="#707070"
              //                               //placeholderStyle={styles.placeHolderStyles}
              //                               onChangeText={this.onchangeTelephone}
              //                               keyboardType="number-pad"
              //                               value={this.state.telephone}
              //                               //containerStyle={styles.input}
              //                               errorMessage={this.state.telephoneError}
              //                               //inputContainerStyle={styles.inputConatiner}
              //                               //style={styles.input}
              //                               //inputStyle={styles.inputStyles}
              //                               textAlign={'center'}
              //                               style={styles.input}
              //                           /> */}
              //   </FastImage>
              //   {/* <FastImage
              //                           style={styles.loginSection2}
              //                           source={require('./assets/inpur_bg.png')}
              //                           resizeMode={FastImage.resizeMode.stretch}
              //                       >
              //                           <RNPickerSelect
              //                               useNativeAndroidPickerStyle={false}
              //                               placeholder={{
              //                                   label: 'Seleccione su situación actual:',
              //                                   value: null,
              //                                   color: "#000"
              //                               }}
              //                               value={myReason}
              //                               style={pickerStyle}
              //                               onValueChange={(value) => {
              //                                   this.setState({ myReason: value })
              //                                   //console.log(value)
              //                               }}
              //                               items={!reasons || !reasons.length ? [] : reasons}
              //                           />

              //                       </FastImage> */}
              // </View>
            )}
            {/* {!this.state.switchBtn && (
              <View style={styles.linkView}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ isChecked: !this.state.isChecked })
                  }>
                  <FastImage
                    source={require('../../Images/empty_box.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.emptyCheck}>
                    {this.state.isChecked && (
                      <FastImage
                        source={require('../../Images/Check.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.emptyCheck}
                      />
                    )}
                  </FastImage>
                </TouchableOpacity>
                <Text style={[styles.linkTest, { marginLeft: 5 }]}>
                  {'Acepto las '}
                  <Text
                    onPress={() =>
                      Linking.openURL(
                        'https://neoestudio.net/inicio/terminos-y-condiciones/',
                      )
                    }
                    style={[
                      styles.linkTest,
                      { textDecorationLine: 'underline' },
                    ]}>
                    {'terminos de uso '}
                  </Text>
                  <Text style={styles.linkTest}>
                    {'y solicito recibir información'}
                  </Text>
                </Text>
              </View>
            )} */}


            {this.state.switchBtn && <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                this.loginHandler();
              }}>
              <FastImage
                source={
                  this.state.switchBtn
                    ? require('../../Images/button_inciar.png')
                    : require('../../Images/button_gratis.png')
                }
                resizeMode={FastImage.resizeMode.contain}
                style={styles.button}
              />
            </TouchableOpacity>
            }

          </View>
          {/* </KeyboardAwareScrollView> */}
          {AuthLoading && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loading}
            />
          )}
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loading}
            />
          )}
          {this.state.isOpen && (
            <Modal
              transparent={true}
              visible={this.state.modalVisible}
              supportedOrientations={['portrait', 'landscape']}
              onRequestClose={() => {
                console.log('alert close');
              }}>
              <TouchableOpacity
                style={styles.modalMain}
                activeOpacity={1}
                onPressOut={() => this.setState({ isOpen: false })}>
                <TouchableWithoutFeedback>
                  <FastImage
                    source={require('./assets/que_box.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.quesBox}>
                    <Text style={styles.text1}>
                      {
                        'Hola, ¿ya conoces las ventajas que tienen los alumnos de Neoestudio para conseguir sus plazas en la Guardia Civil frente a los otros opositores?'
                      }
                    </Text>
                    <Text style={styles.text2}>
                      {
                        '¡Entra, descúbrelas y empieza ya a competir en nuestro ranking masivo!'
                      }
                    </Text>
                  </FastImage>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
      </BackgroudVideo>
    );
  }
}

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4.5),
    //fontWeight: "normal",
    paddingHorizontal: 10,
    //backgroundColor: 'red',
    borderRadius: 5,
  },
  placeholder: {
    color: '#707070',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4.5),
    //fontWeight: "normal",
  },
  inputAndroid: {
    color: '#000',
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4.5),
    //fontWeight: "normal",
    paddingHorizontal: 10,
    //backgroundColor: 'red',
    borderRadius: 5,
  },
  modalViewBottom: {
    backgroundColor: 'grey',
  },
};

const mapStateToProps = state => ({
  user: state.user,
  dialog: state.dialog,
});
export default connect(mapStateToProps, {
  userLogin,
  dispatchFunc,
  updateOrientation,
  userAppleLogin
})(Login);
