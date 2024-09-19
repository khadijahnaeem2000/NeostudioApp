//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Orientation from 'react-native-orientation-locker';

// create a component
const TestScreen = ({ navigation, route }) => {
  const { id, isImage, isRepasoImage, type, fromReview } = route.params

  useEffect(() => {
    const locked = Orientation.isLocked();
    if (!locked) {
      Orientation.lockToPortrait();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Orientation.unlockAllOrientations(),
        navigation.navigate('Review', {
          id: id,
          isImage: isImage,
          type: type,
          fromReview: fromReview,
          isRepasoImage: isRepasoImage,
        });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" style={styles.loading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});

//make this component available to the app
export default TestScreen;
