/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { PlaybackService } from './src/trackservice';

import { name as appName } from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(Platform.OS === 'ios' ? "neoschool" : appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
