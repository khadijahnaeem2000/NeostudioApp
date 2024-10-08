import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import MAINAPP from './MainApp';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import RemotePushController from './src/services/RemotePushController';
import store, { persistor } from './src/Redux/store';
import { SetupService } from './src/trackservice';
import { notificationListener } from './src/services/notification_service';
import ResultPopup from './src/Component/ResultPopup';
//======================================================
export default class App extends React.Component {


  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    SetupService()


  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RemotePushController />
            <MAINAPP />
            <ResultPopup />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
