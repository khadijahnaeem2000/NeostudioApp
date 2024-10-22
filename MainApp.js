import React, { useEffect, useState, useRef } from 'react';
import { View, AppState, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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

const MainApp = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [timer, setTimer] = useState(240);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { login } = user || {};

 
  const test = () => {
    Orientation.unlockAllOrientations();
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      dispatch(saveToken(fcmToken));
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    test()
    getFcmToken()
    notificationListener(dispatch);
    console.log("yahna yayayayayyayay");

    startTimer(); // Start the timer on mount

    const appStateListener = AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      clearTimer(); // Clean up timer on unmount
      appStateListener.remove(); // Clean up app state listener
    };
  }, []);

  const startTimer = () => {
    clearTimer(); // Clear any existing interval before starting a new one

    intervalRef.current = setInterval(async () => {
      setTimer(prevTimer => {
        const newTimer = prevTimer - 1;
        if (newTimer === 0) {
          clearTimer();
          checkIfRegistered();
        }
        return newTimer;
      });
    }, 1000);
  };

  const checkIfRegistered = async () => {
    if (login?.data?.id) {
      const response = await checkRegistration(login.data.id);
      if (response?.data?.IsRegistered?.toLowerCase() === 'no') {
        setShowModal(true);
      }
    }
  };



  const onRegister = async (data) => {
    if (login?.data?.id) {
      const response = await dispatch(addRegister({ ...data, id: login.data.id }));
      if (response?.status === 'Successful') {
        setShowModal(false);
      }
    }
  };

  const _handleAppStateChange = (nextAppState) => {
    if (login) {
      if (nextAppState === 'background') {
        dispatch(updateLogoutTime(login.data.id));
        dispatch(updateUserRankPoint('Yes', 'No', 'normal_points', login.data.id));
      } else if (nextAppState === 'active') {
        dispatch(saveUserRankPoint('Yes', 'No', 'normal_points', login.data.id));
        dispatch(updateLoginTime(login.data.id));
      }
    }
    setAppState(nextAppState);
  };

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={login ? "MainNavigation" : "AuthNavigation"}
        screenOptions={{ headerShown: false }}
      >
        {login ? (
          <Stack.Screen name="MainNavigation" component={MainNavigation} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>

      <RegisterModal
        visible={showModal}
        onPressClose={() => {
          setShowModal(false);
          setTimer(240);
          startTimer();
        }}
        onPressButton={(val) => onRegister(val)}
      />
      <Dialog dispatchFunction={() => dispatch(dispatchFunc())} />
    </NavigationContainer>
  );
};

export default MainApp;
