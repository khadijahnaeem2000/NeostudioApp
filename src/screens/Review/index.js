import React, {PureComponent} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import Header from '../../Component/Header';
import {getReviewTestList, clearStates} from '../../Redux/action';
import Directory from './directory';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
const URL = 'https://neoestudio.net/api/getAllReviewFolders';

class ReviewTest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: [],
      isLoading: false,
      isRefresh: false,
      page: 1,
      testData: [],
    };
  }

  getExamApi = () => {
    const {login} = this.props.user;
    this.props.clearStates();
    this.setState({isLoading: true});
    fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: login?.data?.id,
        studentType: login.data.type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({isLoading: false});
        if (json.status === 'Successfull') {
          this.setState({testData: json.data});
        }
      })
      .catch(error => {
        this.setState({isLoading: false});
      });
  };
  update = () => {
    var initial = Orientation.getInitialOrientation();
    if (initial === 'LANDSCAPE') {
      Orientation.lockToPortrait();
      this.getExamApi();
      //do stuff
    } else {
      Orientation.lockToPortrait();
      this.getExamApi();
    }
  };
  UNSAFE_componentWillMount() {
    var initial = Orientation.getInitialOrientation();
    if (initial === 'LANDSCAPE') {
      Orientation.lockToPortrait();
      //do stuff
    }
  }
  _onOrientationDidChange = orientation => {
    if (orientation == 'LANDSCAPE') {
      Orientation.lockToPortrait();
    }
  };

  componentDidMount() {
      this.update()
    this.getExamApi();
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }
  _onLayout = e => {
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };
  render() {
    const {reviewList, AuthLoading} = this.props.user;
    const {testData} = this.state;
    console.log("Review Test Me hgee")
    return (
      <FastImage
        source={require('../../Images/bg.png')}
        style={styles.container}
        resizeMode={FastImage.resizeMode.stretch}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Repaso'}
        />
        <View style={styles.directoryView}>
          {!testData || !testData.length ? (
            <View />
          ) : (
            <FlatList
              data={testData}
              distanceBetweenItem={12}
              keyExtractor={item => 'unique' + item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              initialNumToRender={8}
              renderItem={({item, index}) => {
                return (
                  <Directory
                    key={'unique' + index}
                    img={require('../../Images/directory.png')}
                    title={item.name}
                    status="Habilitado"
                    isActive={item.isActive}
                    count={item.count}
                    clickHandler={() => {
                      this.props.navigation.navigate('ReviewTestExam', {
                        position: item.id,
                        name: item.name,
                      });
                    }}
                  />
                );
              }}
            />
          )}
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.isLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {getReviewTestList, clearStates})(
  ReviewTest,
);
