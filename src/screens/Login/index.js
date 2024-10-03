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
  Platform,
  Linking
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
      email: 'Alex.1',
      emailError: '',
      telephone: 'Alex.1',
      telephoneError: '',
      userName: 'Alex.1',
      userNameError: '',
      password: 'karamelo1996',
      passwordError: '',
      isOpen: false,
      ipAddress: '',
      isLoading: false,
      reasons: [],
      myReason: '',
      formattedValue: '',
      phoneNo: '',
      isChecked: false,
      isBlock: false
    };
    this.getIPAddress();
    this.phoneInput = null;
  }



  componentDidMount() {
    this.handleNotificationPermission()
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      } else {
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
    }, '', '', () => this.setState({ isBlock: true }));
  };

  googleSignInHandler = async () => {
    try {
      const isGoogleSignin = await GoogleSignin.hasPreviousSignIn()
      const googleuser = await GoogleSignin.getCurrentUser()
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
    
      this.props.userLogin('true', this.state.userName, this.state.password, '', () => this.setState({ isBlock: true }));
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
    
      this.props.userLogin(
        'false',
        this.state.phoneNo,
        this.state.email,
        this.state.myReason,
        () => this.setState({ isBlock: true })
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
    const { isLoading, reasons, myReason, phoneNo, formattedValue, isBlock } = this.state;
    const { isDialogOpen, errorMessage } = this.props.dialog;

    return (
      <BackgroudVideo
      >
        <View style={styles.loginView}>
          <View
            style={{ marginTop: heightPercentageToDP(isBlock ? 27 : 30), alignSelf: 'center' }}>


            {
              isBlock ?
                <>
                  <Text style={styles.heading}  >
                    {"Tu cuenta está bloqueada."}
                  </Text>

                  <Text style={styles.description}  >
                    {"Realiza el pago para \no envíanos un Whatsapp"}
                  </Text>

                  <View   style={{height:heightPercentageToDP(3)}}  />

                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://buy.stripe.com/14k14iamu7VocJq9AV")}
                    style={styles.btnStyle}
                  >
                    <FastImage
                      source={
                        require('./assets/stripe_btn.png')
                      }
                      resizeMode={FastImage.resizeMode.contain}
                      style={styles.button}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => Linking.openURL('https://api.whatsapp.com/send/?phone=34621251720&text&type=phone_number&app_absent=0')}>
                    <FastImage
                      source={
                        require('./assets/whatsapp_btn.png')
                      }
                      resizeMode={FastImage.resizeMode.contain}
                      style={styles.button}
                    />
                  </TouchableOpacity>


                  <TouchableOpacity style={{
                    alignSelf: "center",
                    marginTop: 30,
                    height: 40,
                    justifyContent: "center"
                  }}
                    activeOpacity={0.6}
                    onPress={() => this.setState({ isBlock: false })}
                  >
                    <Text style={{
                      color: "white",
                      fontFamily: fonts.novaBold,

                      fontSize: widthPercentageToDP(5),
                      textAlign: "center",
                      textDecorationLine: "underline"
                    }} >Reintentar</Text>
                  </TouchableOpacity>
                </>
                :
                <>
                  <View
                    style={{ width: widthPercentageToDP(100), alignItems: 'center' }}>
                    <View style={styles.version}>

                      {!this.state.switchBtn &&
                        <Text style={styles.heading}  >
                          {"CURSO DE INGRESO A GUARDIA CIVIL\n48 HORAS GRATIS"}
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
                          errorMessage={this.state.passwordError}
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
                  )}
                </>
            }


            {this.state.switchBtn && !isBlock && <TouchableOpacity
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
