import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';

const TestTwo = ({ navigation, route }) => {


  useFocusEffect(
    useCallback(() => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscapeRight();
      }
    }, []))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VideoPlayer
        source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
        navigator={() => {
          Orientation.unlockAllOrientations();
          navigation.goBack();
        }}
        ignoreSilentSwitch='ignore'
        disableFullscreen={true}
      />
    </SafeAreaView>
  );
};

export default TestTwo
