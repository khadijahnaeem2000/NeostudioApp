import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import Header from '../../Component/Header';
import { getReviewTestList, clearStates } from '../../Redux/action';
import Directory from './directory';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import ModalBox from '../../Component/Modal';
const URL = 'https://neoestudio.net/api/getReviewFolderExams';

class ReviewTest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: [],
      isLoading: false,
      isRefresh: false,
      page: 1,
      testData: [],
      isOpen: false,
      examID: '',
    };
  }

  toggleBox = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  getExamApi = (isRestart, examId) => {
    const { login } = this.props.user;
    const position = this.props.route.params.position || '1234'
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
        folderId: position,
        examId: examId,
        isRestart: isRestart,
      }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoading: false });
        if (json.status === 'Successfull') {
          this.setState({ testData: json.data });
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };
  updateExamApi = examId => {
    const { login } = this.props.user;
    const position = this.props.route.params?.position ?? '1234';
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
        folderId: position,
        examId: examId,
        isRestart: 'yes',
      }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoading: false });
        if (json.status === 'Successful') {
          this.setState({ testData: json.data });
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };
  componentDidMount() {
    this.getExamApi('no', null);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  render() {
    const { reviewList, AuthLoading } = this.props.user;
    const { testData, isOpen, examID } = this.state;
    const name = this.props.route.params.name ||  'exam' ('name', 'exam');
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
          title={'Repaso'}
        />
        <View style={[styles.directoryView, { marginBottom: 10 }]}>
          {!testData || !testData.length ? (
            <View />
          ) : (
            <FlatList
              data={testData}
              keyExtractor={item => 'unique' + item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              initialNumToRender={8}
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
                    isActive={item.isActive}
                    title={item.name}
                    status={item.studentStatus}
                    clickHandler={() => {
                      Orientation.unlockAllOrientations();
                      if (item.studentStatus === 'Habilitado') {
                        this.props.navigation.navigate('Test', {
                          examsId: item.id,
                          totalTime: item.examDuration,
                          isPsico: false,
                          type: 'reviewExam',
                          isReshedule: item.isReshedule,
                          isRepasoImage: name.includes('Psicotécnicos')
                            ? true
                            : false,
                        });
                      } else if (item.studentExamStatus === 'end') {
                        this.props.navigation.navigate('Review', {
                          id: item.studentExamRecordId,
                          isImage: false,
                          type: 'reviewExam',
                          isRepasoImage: name.includes('Psicotécnicos')
                            ? true
                            : false,
                        });
                      }
                    }}
                    onLongPres={() => {
                      this.setState({ examID: item.studentExamRecordId }, () => {
                        if (item.studentExamStatus === 'end') {
                          this.toggleBox();
                        }
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
        {isOpen && (
          <ModalBox
            isOpen={isOpen}
            closeBox={() => this.toggleBox()}
            yesClick={() => {
              this.toggleBox();
              this.getExamApi('yes', examID);
            }}
            noClick={() => {
              this.toggleBox();
            }}
          />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, { getReviewTestList, clearStates })(
  ReviewTest,
);
