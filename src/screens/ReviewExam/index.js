import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
  Platform,
  Alert,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import {
  reviewAllExams,
  getReviewRanking,
  endReviewExam,
  getRejectReason,
  updateRejectReason,
} from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';
import { styles } from './styles';
import ExamLayout from './PaperLayout';
import BottomLayout from './BottomLayout';
import PagerView from 'react-native-pager-view';
import NetInfo from '@react-native-community/netinfo';
import ImageExam from './ImageExamsLayout';
import FastImage from 'react-native-fast-image';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEmail: false,
      Test: true,
      currentPage: 0,
      animationsAreEnabled: true,
      width: 0,
      height: 0,
      page: 0,
      appState: AppState.currentState,
      timer: '0',
      netConnected: true,
      pageSelected: 0,
      currentImage: '',
      modalVisible: '',
      isRejected: false,
      myOption: 0,
      reason: '',
    };
    this.getData();
    this.viewPager = React.createRef();
  }

  handleModalOpen = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  getData = async () => {
    const examsID = this.props.route.params.id || '1'
    console.log("examsID", examsID)
    this.props.reviewAllExams(examsID, DeviceInfo.isTablet() ? 'yes' : null);
    this.props.getRejectReason();
  };
  _onLayout = e => {
    let width = e.nativeEvent.layout.width;
    let height = e.nativeEvent.layout.height;
    this.setState({
      height: height,
      width: width,
    });
  };
  componentDidMount() {
    NetInfo.fetch().then(({ isConnected, isInternetReachable, type }) => {
      // console.log('Is connected?', isConnected);
      this.setState({ netConnected: isConnected });
    });
    this.unsubscribeNetInfo = NetInfo.addEventListener(
      ({ isConnected, isInternetReachable, type }) => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        this.setState({ netConnected: isConnected });
      },
    );
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscape();
      }else{
        Orientation.lockToLandscape()
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeNetInfo();
    StatusBar.setHidden(false);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription.remove();
  }
  test = () => {
    Orientation.unlockAllOrientations();
  };
  _handleAppStateChange = nextAppState => {
    const examsID = this.props.route.params.id || '1'
    this.setState({ appState: nextAppState }, () => {
      if (nextAppState === 'background') {
        this.props.endReviewExam(examsID);
      } else {
        this.props.reviewAllExams(
          examsID,
          DeviceInfo.isTablet() ? 'yes' : null,
        );
      }
    });
  };
  handleBackButton = () => {

    const examsID = this.props.route.params.id || "1"
    const type = this.props.route.params.type || 'exam'

    console.log("typetypetype" ,type)

    this.props.endReviewExam(examsID);
    if (type === 'exam') {
      this.test(),
        this.props.navigation.navigate('HomeScreen', {
          isRefresh: 'true',
        });
    } else if (type === 'reviewExam') {
      this.test(), this.props.navigation.navigate('ReviewTest');
    } else if (type === 'personality') {
      this.test(), this.props.navigation.navigate('Personality');
    } else if (type === 'all') {
      this.test(), this.props.navigation.navigate('Activity');
    } else {
      this.test(), this.props.navigation.popToTop();
    }
    return true;
  };
  move = number => {
    const page = this.state.page + number;
    this.go(page);
  };
  go = number => {
    if (this.state.animationsAreEnabled) {
      /* $FlowFixMe we need to update flow to support React.Ref and createRef() */
      this.viewPager.current.setPage(number);
    } else {
      /* $FlowFixMe we need to update flow to support React.Ref and createRef() */
      this.viewPager.current.setPageWithoutAnimation(number);
    }
  };

  render() {
    const {
      reviewAll,
      AuthLoading,
      login,
      reviewDrawer,
      rejectReason,
    } = this.props.user;
    const {
      errorMessage
    } = this.props.dialog;

    const isPsico = this.props.route.params.isImage || 'false'
    const type = this.props.route.params.type || 'exam'
    const isRepasoImage = this.props.route.params.isRepasoImage || false

    console.log("Review screeen me heehhehehehhe",type)

    const { myOption } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <View style={styles.topView}>
          <View style={styles.playPauseView}>
            <TouchableOpacity
              style={[
                styles.btnImage,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
              onPress={() => {
                this.setState({ modalVisible: 'modalVisible' });
              }}>
              <Icon1 name="menu" color="#000" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: 'isRejected' });
              }}>
              <FastImage
                source={require('../../Images/block.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.btnImage}
              />
            </TouchableOpacity>
            <View style={styles.btnImage} />
          </View>
          <View style={styles.timerView}></View>
          <FastImage
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
            source={
              Platform.OS === 'android'
                ? require('../../Images/veoestudio2.png')
                : require('../../Images/ios_logo.png')
            }
          />
        </View>
        <PagerView
          style={styles.middleView}
          initialPage={0}
          setPage={this.state.currentPage}
          onPageSelected={e =>
            this.setState({ pageSelected: e.nativeEvent.position })
          }
          ref={this.viewPager}>
          {
            reviewAll?.data?.length > 0 ?
              reviewAll.data.map((item, index) => (
                <>
                  {
                    isPsico === true ?
                      <ImageExam
                        key={'unique' + index}
                        isAttempt={item.studentAnswered === null ? false : true}
                        isOption1={item.studentAnswered}
                        imgURL={item.image}
                        option1={item.answer1}
                        option2={item.answer2}
                        option3={item.answer3}
                        option4={item.answer4}
                        question={item.question}
                        correct={item.correct}
                        description={item.description}
                        clickHandler1={() => {
                          this.state.netConnected
                            ? this.props.getStartExamData(
                              null,
                              null,
                              item.id,
                              'answer1',
                            )
                            : Alert.alert(
                              'Connection Failed',
                              'Check your internet connection and try again',
                            );
                        }}
                        clickHandler2={() => {
                          this.state.netConnected
                            ? this.props.getStartExamData(
                              null,
                              null,
                              item.id,
                              'answer2',
                            )
                            : Alert.alert(
                              'Connection Failed',
                              'Check your internet connection and try again',
                            );
                        }}
                        clickHandler3={() => {
                          this.state.netConnected
                            ? this.props.getStartExamData(
                              null,
                              null,
                              item.id,
                              'answer3',
                            )
                            : Alert.alert(
                              'Connection Failed',
                              'Check your internet connection and try again',
                            );
                        }}
                        clickHandler4={() => {
                          this.state.netConnected
                            ? this.props.getStartExamData(
                              null,
                              null,
                              item.id,
                              'answer4',
                            )
                            : Alert.alert(
                              'Connection Failed',
                              'Check your internet connection and try again',
                            );
                        }}
                        ModalClick={() =>
                          this.setState({ currentImage: item.image }, () =>
                            this.setState({ isOpen: true }),
                          )
                        }
                      /> :
                      type === 'reviewExam' && isRepasoImage ?
                        <ImageExam
                          key={'unique' + index}
                          isAttempt={item.studentAnswered === null ? false : true}
                          isOption1={item.studentAnswered}
                          imgURL={item.image}
                          option1={item.answer1}
                          option2={item.answer2}
                          option3={item.answer3}
                          option4={item.answer4}
                          question={item.question}
                          correct={item.correct}
                          description={item.description}
                          clickHandler1={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer1',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          clickHandler2={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer2',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          clickHandler3={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer3',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          clickHandler4={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer4',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          ModalClick={() =>
                            this.setState({ currentImage: item.image }, () =>
                              this.setState({ isOpen: true }),
                            )
                          }
                        />
                        :
                        <ExamLayout
                          key={'unique' + index}
                          isAttempt={item.studentAnswered === null ? false : true}
                          isOption1={item.studentAnswered}
                          option1={item.answer1}
                          option2={item.answer2}
                          option3={item.answer3}
                          option4={item.answer4}
                          question={item.question}
                          correct={item.correct}
                          description={item.description}
                          clickHandler1={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer1',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          clickHandler2={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer2',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          clickHandler3={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer3',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                          clickHandler4={() => {
                            this.state.netConnected
                              ? this.props.getStartExamData(
                                null,
                                null,
                                item.id,
                                'answer4',
                              )
                              : Alert.alert(
                                'Connection Failed',
                                'Check your internet connection and try again',
                              );
                          }}
                        />

                  }
                </>
              ))
              :
              <View style={{
                flex: 1,

                justifyContent: "center",
                alignItems: "center"
              }}  >
                <Text style={{ marginTop: -50 }} >{errorMessage}</Text>
              </View>
          }
        </PagerView>
        <View style={styles.bottomView}>
          <ScrollView horizontal contentContainerStyle={{ flexGrow: 0 }}>
            {!reviewAll ? (
              <View />
            ) : (
              reviewAll?.data.map((item, index) => {
                return (
                  <BottomLayout
                    key={'unique' + index}
                    text={index + 1}
                    isSelected={
                      this.state.pageSelected === index ? true : false
                    }
                    isAttempt={item.status}
                    totalItem={reviewAll.totalItems}
                    clickHandler={() => this.move(index)}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
        {(AuthLoading || (!reviewAll?.data?.length && errorMessage?.length < 1)) && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        <Modal
          transparent={true}
          visible={this.state.modalVisible === 'modalVisible'}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => {
          }}>
          <View style={styles.modalMain2}>
            <View style={styles.innerModal2}>
              <FastImage
                source={require('../../Images/navigationSlider.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.navigation}>
                <View style={styles.topModal}>
                  <View style={styles.navigationHeader}>
                    <TouchableOpacity
                      //style = {styles.}
                      onPress={() => this.setState({ modalVisible: '' })}>
                      <Icon2 name="close" color="#ffff" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
                {!reviewDrawer ? (
                  <View />
                ) : (
                  <View style={styles.mainModalView}>
                    <View style={styles.timeView}>
                      <Text style={styles.timeText}>{'Tiempo:'}</Text>
                      <Text
                        style={[
                          styles.timeValue,
                          {
                            marginLeft: widthPercentageToDP(11.5),
                          },
                        ]}>
                        {reviewDrawer.time}
                      </Text>
                      <Text style={styles.mnTime}>{'min'}</Text>
                    </View>
                    <View
                      style={[
                        styles.timeView,
                        {
                          marginTop: widthPercentageToDP(5),
                        },
                      ]}>
                      <Text style={styles.timeText}>{'Nº Preguntas:'}</Text>
                      <Text
                        style={[
                          styles.timeValue,
                          {
                            marginLeft: widthPercentageToDP(6.5),
                          },
                        ]}>
                        {reviewDrawer.totalQuestions}
                      </Text>
                    </View>
                    <View style={styles.timeView}>
                      <Text style={styles.timeText}>{'Aciertos:'}</Text>
                      <View style={styles.midView}>
                        <Text style={styles.timeValue6}>
                          {reviewDrawer.correctCount}
                        </Text>
                        <Text style={styles.timeValue2}>
                          {reviewDrawer.correctScore}
                        </Text>
                        <Text style={styles.mnTime}>{'pts'}</Text>
                      </View>
                    </View>
                    <View style={styles.timeView}>
                      <Text style={styles.timeText}>{'Fallos:'}</Text>
                      <View style={styles.midView}>
                        <Text style={styles.timeValue4}>
                          {reviewDrawer.wrongCount}
                        </Text>
                        <Text style={styles.timeValue2}>
                          {reviewDrawer.wrongScore}
                        </Text>
                        <Text style={styles.mnTime}>{'pts'}</Text>
                      </View>
                    </View>
                    <View style={styles.timeView}>
                      <Text style={styles.timeText}>{'Nulos:'}</Text>
                      <View style={styles.midView}>
                        <Text style={styles.timeValue5}>
                          {reviewDrawer.nonAttemptedCount}
                        </Text>
                        <Text style={styles.timeValue2}>
                          {reviewDrawer.nonAttemptedScore}
                        </Text>
                        <Text style={styles.mnTime}>{'pts'}</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.timeView,
                        {
                          marginTop: widthPercentageToDP(3),
                        },
                      ]}>
                      <Text style={styles.timeText}>{'Puntuación:'}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <Text
                          style={[
                            styles.timeValue2,
                            {
                              marginLeft: widthPercentageToDP(8),
                            },
                          ]}>
                          {reviewDrawer.score}
                        </Text>
                        <Text style={styles.mnTime}>{'pts'}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </FastImage>
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={this.state.modalVisible === 'isRejected'}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => {
          }}>
          <View style={styles.rejectView}>
            <View style={styles.rejectContainer}>
              {!rejectReason || !rejectReason.length ? (
                <View />
              ) : (
                <>
                  <Text style={styles.rejectDescription}>
                    {rejectReason[0].Description}
                  </Text>
                  <View style={styles.listOptions}>
                    <ScrollView
                      contentContainerStyle={{ flexGrow: 1 }}
                      showsVerticalScrollIndicator={false}>
                      <TouchableOpacity
                        onPress={() => this.setState({ myOption: 1 })}
                        style={styles.optionsStyle}>
                        {myOption == 1 ? (
                          <Image
                            style={{
                              width: widthPercentageToDP(5),
                              height: widthPercentageToDP(3),
                            }}
                            resizeMode="stretch"
                            source={require('../../Images/arrow.png')}
                          />
                        ) : (
                          <View
                            style={{
                              width: widthPercentageToDP(5),
                              height: widthPercentageToDP(3),
                            }}
                          />
                        )}
                        <Text style={styles.rejectItems}>
                          {rejectReason[0].Option1}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ myOption: 2 })}
                        style={styles.optionsStyle}>
                        {myOption == 2 ? (
                          <Image
                            style={{
                              width: widthPercentageToDP(5),
                              height: widthPercentageToDP(3),
                            }}
                            resizeMode="stretch"
                            source={require('../../Images/arrow.png')}
                          />
                        ) : (
                          <View
                            style={{
                              width: widthPercentageToDP(5),
                              height: widthPercentageToDP(3),
                            }}
                          />
                        )}
                        <Text style={styles.rejectItems}>
                          {rejectReason[0].Option2}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ myOption: 3 })}
                        style={styles.optionsStyle}>
                        {myOption == 3 ? (
                          <Image
                            style={{
                              width: widthPercentageToDP(5),
                              height: widthPercentageToDP(3),
                            }}
                            resizeMode="stretch"
                            source={require('../../Images/arrow.png')}
                          />
                        ) : (
                          <View
                            style={{
                              width: widthPercentageToDP(5),
                              height: widthPercentageToDP(3),
                            }}
                          />
                        )}
                        <Text style={styles.rejectItems}>
                          {rejectReason[0].Option3}
                        </Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                          onPress={() => this.setState({myOption: 4})}
                          style={styles.optionsStyle}>
                          {myOption == 4 ? (
                            <Image
                              style={{
                                width: widthPercentageToDP(5),
                                height: widthPercentageToDP(3),
                              }}
                              resizeMode="stretch"
                              source={require('../../Images/arrow.png')}
                            />
                          ) : (
                            <View
                              style={{
                                width: widthPercentageToDP(5),
                                height: widthPercentageToDP(3),
                              }}
                            />
                          )}
                          <Text style={styles.rejectItems}>
                            {rejectReason[0].Option4}
                          </Text>
                        </TouchableOpacity> */}
                      <TextInput
                        placeholder="Explica con detalle qué es lo que se debe corregir"
                        placeholderTextColor={'#000'}
                        style={styles.inputStyle}
                        multiline={true}
                        onChangeText={text => this.setState({ reason: text })}
                      />
                    </ScrollView>
                  </View>
                </>
              )}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#006176', '#00a7cb']}
                style={styles.rejectBottom}>
                <Text
                  style={[
                    styles.rejectBtn,
                    { marginRight: heightPercentageToDP(2) },
                  ]}
                  onPress={() => this.setState({ modalVisible: '' })}>
                  {'Cancelar'}
                </Text>
                <Text
                  style={[
                    styles.rejectBtn,
                    { marginLeft: heightPercentageToDP(2) },
                  ]}
                  onPress={() => {
                    if (this.state.myOption == 0) {
                      Alert.alert('', 'Seleccione cualquier motivo');
                    } else {
                      this.setState({ modalVisible: '' }, () => {
                        updateRejectReason(
                          this.state.reason,
                          login?.data?.id,
                          reviewAll.data[this.state.pageSelected].qaId,
                          this.state.myOption == 1
                            ? 'option1'
                            : this.state.myOption == 2
                              ? 'option2'
                              : this.state.myOption == 3
                                ? 'option3'
                                : '',
                        );
                      });
                    }
                  }}>
                  {'Entregar'}
                </Text>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  dialog: state.dialog,
});
export default connect(mapStateToProps, {
  reviewAllExams,
  getReviewRanking,
  endReviewExam,
  getRejectReason,
})(Review);
