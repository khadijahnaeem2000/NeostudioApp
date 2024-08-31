import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import Header from '../../Component/Header';
import { getPersonalityTestList, clearStates } from '../../Redux/action';
import Directory from './directory';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
const URL = 'https://neoestudio.net/api/getAllPersonalityExams';

class Personality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: [],
      isLoading: false,
      isRefresh: false,
      page: 1,
      testData: [],
      isMoving: false,
    };
  }
  refreshExamList = async () => {
    const { login } = this.props.user;
    this.props.clearStates();
    this.setState({ isRefresh: true, page: 1 });
    let api;
    try {
      api = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          studentId: login?.data?.id,
          studentType: login.data.type,
          offset: 1,
        }),
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ isRefresh: false });
          if (json.status === 'Successfull') {
            return this.setState({ testData: json.data });
          }
        })
        .catch(error => {
        });
    } catch (error) {
    }
    return api;
  };

  getExamApi = page => {
    const { login } = this.props.user;
    this.props.clearStates();
    this.setState({ isLoading: true });
    fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: login?.data?.id,
        studentType: login.data.type,
        offset: page,
      }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoading: false });
        if (json.status === 'Successfull') {
          let temArr = this.state.testData;
          json.data.forEach(item => {
            temArr.push({
              id: item.id,
              name: item.name,
              studentType: item.studentType,
              courseId: item.courseId,
              scheduleDate: item.scheduleDate,
              timeFrom: item.timeFrom,
              folderId: item.folderId,
              status: item.status,
              field1x: item.field1x,
              field2x: item.field2x,
              field3x: item.field3x,
              created_at: item.created_at,
              updated_at: item.updated_at,
              examDuration: item.examDuration,
              studentExamStatus: item.studentExamStatus,
              studentStatus: item.studentStatus,
              isActive: item.isActive,
            });
          });
          this.setState({ testData: temArr });
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };
  LoadMoreRandomData = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => this.getExamApi(this.state.page),
    );
  };


  componentDidMount() {
    this.getExamApi(1);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  render() {
    const { AuthLoading } = this.props.user;
    const { testData } = this.state;
    return (
      <FastImage
        source={require('../../Images/bg.png')}
        style={styles.container}
        resizeMode={FastImage.resizeMode.stretch}>
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
          title={'Entrevista' + '\n' + 'personal'}
        />
        <View style={styles.directoryView}>
          {!testData || !testData.length ? (
            <View />
          ) : (
            <FlatList
              data={testData}
              keyExtractor={item => 'unique' + item.id + 1}
              showsVerticalScrollIndicator={false}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              onEndReached={({ distanceFromEnd }) => {
                if (!this.state.isMoving) {
                  this.LoadMoreRandomData(); // LOAD MORE DATA
                }
              }}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item, index }) => {
                return (
                  <Directory
                    key={'unique' + index}
                    examStatus={item.studentExamStatus}
                    img={
                      item.studentStatus === 'Habilitado'
                        ? require('../../Images/personality2.png')
                        : require('../../Images/personality1.png')
                    }
                    title={item.name}
                    isActive={item.isActive}
                    status={item.studentStatus}
                    clickHandler={() => {
                      Orientation.unlockAllOrientations();
                      if (item.studentStatus === 'Habilitado') {
                        this.setState({ isMoving: true }, () => {
                          this.props.navigation.navigate('Test', {
                            examsId: item.id,
                            totalTime: item.examDuration,
                            isPsico: false,
                            type: 'personality',
                          });
                        });
                      } else if (item.studentExamStatus === 'end') {
                        this.setState({ isMoving: true }, () => {
                          this.props.navigation.navigate('Review', {
                            id: item.studentExamRecordId,
                            isImage: false,
                            type: 'personality',
                          });
                        });
                      }
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
export default connect(mapStateToProps, { getPersonalityTestList, clearStates })(
  Personality,
);
