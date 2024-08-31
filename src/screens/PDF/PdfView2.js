import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  AppState,
} from 'react-native';
import PDF from 'react-native-pdf';
import { connect } from 'react-redux';
import { pdfState } from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';
import { styles } from './styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import Header from '../../Component/Header';

class PdfView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setOrientation: 'PORTRAIT',
    };
  }
  _handleAppStateChange = nextAppState => {
    const { login } = this.props.user;
    this.setState({ appState: nextAppState }, () => {
      if (nextAppState === 'background') {
        this.props.pdfState(login?.data?.id, 'end');
      }
    });
  };
  handleBackButton = () => {
    const { login } = this.props.user;
    this.props.pdfState(login?.data?.id, 'end');
    Orientation.unlockAllOrientations();
    return false;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    StatusBar.setHidden(true);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription.remove();
  }
  render() {
    const url = this.props.route.params.url || "abc"
    var res = encodeURI(url);
    console.log(res);
    const { AuthLoading, login } = this.props.user;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Header
          isPdf={true}
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title=""
        />
        <View
          style={{
            margin: heightPercentageToDP(1),
            width: widthPercentageToDP(98),
            height: heightPercentageToDP(95),
          }}>
          <PDF
            trustAllCerts={false}
            source={{ uri: res }}
            onLoadComplete={(numberOfPages, filePath) => {
              this.props.pdfState(login?.data?.id, 'start');
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link presse: ${uri}`);
            }}
            style={{
              flex: 1,
              // width: widthPercentageToDP(98)
            }}
            horizontal={false}
          />
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  pdfState,
})(PdfView);
