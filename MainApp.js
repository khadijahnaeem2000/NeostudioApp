import React from 'react';
import { View, AppState, Linking } from 'react-native';
import { connect } from 'react-redux';
import {
  dispatchFunc,
  saveToken,
  saveUserRankPoint,
  updateUserRankPoint,
  updateLoginTime,
  updateLogoutTime,
  getUserVideos,
  checkRegistration,
  addRegister,
} from './src/Redux/action';
import Dialog from './src/Component/DailogBox';
import messaging from '@react-native-firebase/messaging';
import Orientation from 'react-native-orientation-locker';
import RegisterModal from './src/screens/Home/registerModal';
import { NavigationContainer } from '@react-navigation/native';
import { navigate, navigationRef } from './src/utils/naviagtion_service';
import AuthNavigation from './src/AuthNavigation';
import MainNavigation from './src/MainNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { notificationListener } from './src/services/notification_service';

class MainApp extends React.Component {
  state = {
    appState: AppState.currentState,
    timer: 240,
    showModal: false,
  };

  fetchVideoData = async () => {
    await getUserVideos('Alumno');
  };

  test = () => {
    Orientation.unlockAllOrientations();
  };

  async componentDidMount() {
    notificationListener()
    // notificationListener()
    // this.appStateSubscription = AppState.addEventListener(
    //   'change',
    //   this._handleAppStateChange,
    // );
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   this.getFcmToken();
    // }
    // messaging().onMessage(async remoteMessage => {
    //   console.log("remote MEssgeeeee" , remoteMessage?.notification)
    // });
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   if (remoteMessage?.data?.isweb === 'True') {
    //     Linking.openURL(remoteMessage?.data?.weburl);
    //   } else {
    //     if (remoteMessage?.data?.screen === 'Actividades') {
    //       {
    //         this.test(), navigate('Actividad');
    //       }
    //     } else if (remoteMessage?.data?.screen === 'Entrenamiento') {
    //       {
    //         this.test(), this.fetchVideoData();
    //       }
    //     } else if (remoteMessage?.data?.screen === 'Clases') {
    //       this.test(), navigate('Clases');
    //     } else if (remoteMessage?.data?.screen === 'Exámenes') {
    //       this.test(),
    //         navigate('ExamFile', {
    //           isRefresh: 'false',
    //         });
    //     } else if (remoteMessage?.data?.screen === 'Temario') {
    //       this.test(), navigate('PDF');
    //     } else if (remoteMessage?.data?.screen === 'Videos') {
    //       this.test(), navigate('VideoClass');
    //     } else if (remoteMessage?.data?.screen === 'Ranking global') {
    //       this.test(), navigate('GlobalRanking');
    //     } else if (remoteMessage?.data?.screen === 'Audiolibro') {
    //       this.test(), navigate('AudioClass');
    //     } else if (remoteMessage?.data?.screen === 'Repaso') {
    //       this.test(), navigate('ReviewTest');
    //     } else if (remoteMessage?.data?.screen === 'Entervista') {
    //       this.test(), navigate('Personality');
    //     } else if (remoteMessage?.data?.screen === 'Descargas') {
    //       this.test(), navigate('DownUpload');
    //     } else {
    //       console.log('no screen found');
    //     }
    //   }
    // });
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage,
    //   );
    //   if (remoteMessage?.data?.isweb === 'True') {
    //     Linking.openURL(remoteMessage?.data?.weburl);
    //   } else {
    //     if (remoteMessage?.data?.screen === 'Actividades') {
    //       {
    //         this.test(), navigate('Actividad');
    //       }
    //     } else if (remoteMessage?.data?.screen === 'Entrenamiento') {
    //       {
    //         this.test(), this.fetchVideoData();
    //       }
    //     } else if (remoteMessage?.data?.screen === 'Clases') {
    //       this.test(), navigate('Clases');
    //     } else if (remoteMessage?.data?.screen === 'Exámenes') {
    //       this.test(),
    //         navigate('ExamFile', {
    //           isRefresh: 'false',
    //         });
    //     } else if (remoteMessage?.data?.screen === 'Temario') {
    //       this.test(), navigate('PDF');
    //     } else if (remoteMessage?.data?.screen === 'Videos') {
    //       this.test(), navigate('VideoClass');
    //     } else if (remoteMessage?.data?.screen === 'Ranking global') {
    //       this.test(), navigate('GlobalRanking');
    //     } else if (remoteMessage?.data?.screen === 'Audiolibro') {
    //       this.test(), navigate('AudioClass');
    //     } else if (remoteMessage?.data?.screen === 'Repaso') {
    //       this.test(), navigate('ReviewTest');
    //     } else if (remoteMessage?.data?.screen === 'Entervista') {
    //       this.test(), navigate('Personality');
    //     } else if (remoteMessage?.data?.screen === 'Descargas') {
    //       this.test(), navigate('DownUpload');
    //     } else {
    //       console.log('no screen found');
    //     }
    //   }
    // });
    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     console.log(
    //       'Notification caused app to open from quit state:',
    //       remoteMessage,
    //     );
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage,
    //       );
    //       if (remoteMessage?.data?.isweb === 'True') {
    //         Linking.openURL(remoteMessage?.data?.weburl);
    //       } else {
    //         if (remoteMessage?.data?.screen === 'Actividades') {
    //           {
    //             this.test(), navigate('Actividad');
    //           }
    //         } else if (remoteMessage?.data?.screen === 'Entrenamiento') {
    //           {
    //             this.test(), this.fetchVideoData();
    //           }
    //         } else if (remoteMessage?.data?.screen === 'Clases') {
    //           this.test(), navigate('Clases');
    //         } else if (remoteMessage?.data?.screen === 'Exámenes') {
    //           this.test(),
    //             navigate('ExamFile', {
    //               isRefresh: 'false',
    //             });
    //         } else if (remoteMessage?.data?.screen === 'Temario') {
    //           this.test(), navigate('PDF');
    //         } else if (remoteMessage?.data?.screen === 'Videos') {
    //           this.test(), navigate('VideoClass');
    //         } else if (remoteMessage?.data?.screen === 'Ranking global') {
    //           this.test(), navigate('GlobalRanking');
    //         } else if (remoteMessage?.data?.screen === 'Audiolibro') {
    //           this.test(), navigate('AudioClass');
    //         } else if (remoteMessage?.data?.screen === 'Repaso') {
    //           this.test(), navigate('ReviewTest');
    //         } else if (remoteMessage?.data?.screen === 'Entervista') {
    //           this.test(), navigate('Personality');
    //         } else if (remoteMessage?.data?.screen === 'Descargas') {
    //           this.test(), navigate('DownUpload');
    //         } else {
    //           console.log('no screen found');
    //         }
    //       }
    //     }
    //   });
  }

  clearTimer = () => {
    if (this.interval) {
      clearInterval(this.interval); // Clear the interval
    }
  };

  resetTimer = () => {
    this.setState({ timer: 60 }, () => {
      this.startTimer(); // Restart the timer when reset
    });
  };

  componentDidMount() {
    this.startTimer(); // Start the timer when the component mounts
  }

  componentWillUnmount() {
    this.clearTimer(); // Clear the interval when the component unmounts to avoid memory leaks
  }

  startTimer = () => {
    this.clearTimer(); // Clear any existing interval before starting a new one
    const { login } = this.props.user;
    this.interval = setInterval(() => {
      this.setState(
        prevState => ({
          timer: prevState.timer - 1,
        }),
        async () => {
          if (this.state.timer === 0) {
            this.clearTimer(); // Stop the timer when it reaches 0
            const response = await checkRegistration(login?.data?.id);
            if (response?.data?.IsRegistered?.toLowerCase() === 'no' && login?.data?.id) {
              this.setState({ showModal: true });
            }
            // You can restart the timer here automatically if desired
            // this.startTimer(); // Uncomment to automatically restart
          }
        },
      );
    }, 1000);
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      this.props.saveToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  async onRegister(data) {
    const { login } = this.props.user;
    const response = await addRegister({ ...data, id: login?.data?.id });
    if (response?.status === 'Successful') {
      this.setState({ showModal: false });
    }
  }

  // componentWillUnmount() {
  //   // this.appStateSubscription.remove();
  // }

  _handleAppStateChange = nextAppState => {
    const { login } = this.props.user;
    if (login) {
      if (nextAppState === 'background') {
        this.props.updateLogoutTime(login?.data?.id);
        updateUserRankPoint('Yes', 'No', 'normal_points', login?.data?.id);
      } else if (nextAppState === 'active') {
        saveUserRankPoint('Yes', 'No', 'normal_points', login?.data?.id);
        this.props.updateLoginTime(login?.data?.id);
      }
    }
  };




  render() {
    const Stack = createNativeStackNavigator();
    const { login } = this.props.user;
    return (
      <NavigationContainer ref={navigationRef} >
        <Stack.Navigator
          initialRouteName={login ? "AuthNavigation" : "MainNavigation"}
          screenOptions={{ headerShown: false }}
        >
          {
            login ?
              <Stack.Screen name="MainNavigation" component={MainNavigation} />
              :
              <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
          }
        </Stack.Navigator>

        <RegisterModal
          visible={this.state.showModal}
          onPressClose={() => {
            this.setState({ showModal: false });
            this.setState({ timer: 240 });
            this.startTimer();
          }}
          onPressButton={val => this.onRegister(val)}
        />
        <Dialog dispatchFunction={this.props.dispatchFunc} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
};
export default connect(mapStateToProps, {
  dispatchFunc,
  saveToken,
  updateLoginTime,
  updateLogoutTime,
})(MainApp);