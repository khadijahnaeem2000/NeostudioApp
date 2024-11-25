import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import Webview from 'react-native-webview';

const URL = 'https://neoestudio.net/googleChart?studentId=';

const GlobalRanking = () => {

  const { login } = useSelector(state => state.user);

  const ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator color="#009688" size="large" style={styles.loading} />
    );
  }

  const scalesPageToFit = Platform.OS === 'android';
  return (
    <Webview
      style={styles.WebViewStyle}
      source={{ uri: `${URL}` + login?.data?.id }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      renderLoading={ActivityIndicatorLoadingView}
      startInLoadingState={true}
      scalesPageToFit={scalesPageToFit}
      bounces={false}
      scrollEnabled={false}>

    </Webview>

  );
}


export default GlobalRanking
