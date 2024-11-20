import React, { useCallback } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import Webview from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const URL = 'https://neoestudio.net/googleChart?studentId=';

const GlobalRanking = () => {

  const { login } = useSelector(state => state.user);

  const ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator color="#009688" size="large" style={styles.loading} />
    );
  }

  useFocusEffect(useCallback(() => { Orientation.lockToLandscape() }, []))


  const scalesPageToFit = Platform.OS === 'android';
  return (
    <Webview
      style={styles.WebViewStyle}
      source={{
        uri: `${URL}` + login?.data?.id,
        //uri: 'http://95.179.208.227/acadmy/public/googleChart',
        //html: '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">',
        // method: 'GET'
      }}
      //Enable Javascript support
      javaScriptEnabled={true}
      //For the Cache
      domStorageEnabled={true}
      //View to show while loading the webpage
      renderLoading={ActivityIndicatorLoadingView}
      //Want to show the view or not
      startInLoadingState={true}
      scalesPageToFit={scalesPageToFit}
      bounces={false}
      scrollEnabled={false}>

    </Webview>

  );
}


export default GlobalRanking
