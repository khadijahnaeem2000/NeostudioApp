import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import Orientation from 'react-native-orientation-locker';
import BottomLayout from './BottomLayout';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { heightPercentageToDP } from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';
//import { data } from '../Test/data'

class ResultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      showmodal: false
    };
  }
  changeKeepAwake = shouldBeAwake => {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
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
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscape();
      }
    });
  }
  test = () => {
    Orientation.unlockAllOrientations();
  };
  test2 = () => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
  };

  render() {
    const { login } = this.props.user;
    const data = this.props.route.params.data || '12'
    const examID = this.props.route.params.examID || "12"
    const isPsico = this.props.route.params.image || 'false'
    const type = this.props.route.params.type || 'exam'
    const isRepasoImage = this.props.route.params.isRepasoImage || false


    return (
      <View
        style={styles.container}
        onLayout={e => {
          this._onLayout(e);
        }}>
        <View style={styles.topView}>
          <FastImage
            source={
              Platform.OS === 'android'
                ? require('../../Images/veoestudio2.png')
                : require('../../Images/ios_logo.png')
            }
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.title}>{data.examName}</Text>
        <View style={styles.centerView}>
          <View style={styles.centerLeftView}>
            <View style={styles.pointView}>
              <Text style={styles.textUnBold}>{'Tiempo:'}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textBold}>{data.examDuration}</Text>
                <Text style={styles.smallText}>
                  {'/'}
                  {data?.totalTime}
                </Text>
              </View>
            </View>
            <View style={styles.pointViewMiddlle}>
              <Text style={styles.textUnBold}>{'Aciertos:'}</Text>
              <Text style={styles.textBold}>{data?.correctCount}</Text>
            </View>
            <View style={styles.pointViewMiddlle2}>
              <Text style={styles.textUnBold}>{'Fallos:'}</Text>
              <Text style={styles.textBold2}>{data?.wrongCount}</Text>
            </View>
            <View style={styles.pointViewMiddlle2}>
              <Text style={styles.textUnBold}>{'Nulos:'}</Text>
              <Text style={styles.textBold2}>{data?.nonAttemptedCount}</Text>
            </View>
            <View style={styles.pointViewBottom}>
              <Text style={styles.textUnBold3}>{'Puntos:'}</Text>
              <Text style={styles.textBold3}>{data?.score}</Text>
            </View>
            {data?.result === null ? (
              <View />
            ) : (
              <View style={styles.passFailView}>
                <Text style={styles.btnText2}>{data?.result}</Text>
              </View>
            )}
          </View>
          <View style={styles.centerMainView}>
            <View style={styles.graphMain}>
              <View style={styles.graphHeight}>
                <LinearGradient
                  style={[
                    styles.graphView,
                    {
                      height: `${data.correctPercentage}%`,
                      //height: `100%`,
                    },
                  ]}
                  colors={['#11942F', '#6AAA65']}
                />
              </View>
              <LinearGradient
                style={styles.graphBottom}
                colors={['#DDE0E3', '#FEFEFF']}>
                <Image
                  source={require('../../Images/correct.png')}
                  resizeMode="stretch"
                  style={styles.graphImage}
                />
              </LinearGradient>
              <Text style={styles.graphText}>
                {Math.floor(data?.correctPercentage)}
                {'%'}
              </Text>
            </View>

            <View style={styles.graphMain}>
              <View style={styles.graphHeight}>
                <LinearGradient
                  style={[
                    styles.graphView,
                    {
                      height: `${data?.wrongPercentage}%`,
                      //height: `100%`,
                    },
                  ]}
                  colors={['#CE0811', '#DE6E51']}
                />
              </View>
              <LinearGradient
                style={styles.graphBottom}
                colors={['#DDE0E3', '#FEFEFF']}>
                <Image
                  source={require('../../Images/cross.png')}
                  resizeMode="stretch"
                  style={styles.graphImage}
                />
              </LinearGradient>
              <Text style={styles.graphText}>
                {Math.floor(data?.wrongPercentage)}
                {'%'}
              </Text>
            </View>

            <View style={styles.graphMain}>
              <View style={styles.graphHeight}>
                <LinearGradient
                  style={[
                    styles.graphView,
                    {
                      height: `${data?.nullPercentage}%`,
                      //height: `100%`,
                    },
                  ]}
                  colors={['#2F312F', '#777677']}
                />
              </View>
              <LinearGradient
                style={styles.graphBottom}
                colors={['#DDE0E3', '#FEFEFF']}>
                <Text style={styles.nullText}>{'Nulo'}</Text>
              </LinearGradient>
              <Text style={styles.graphText}>
                {Math.floor(data?.nullPercentage)}
                {'%'}
              </Text>
            </View>
          </View>
          <View style={styles.centerRightView}>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonImage}
                onPress={() => {
                  this.test2(),
                  Orientation.unlockAllOrientations(),
                  this.props.navigation.navigate('Review', {
                    id: examID,
                    isImage: isPsico,
                    type: type,
                    fromReview: true,
                    isRepasoImage: isRepasoImage,
                  });
                }}>
                <FastImage
                  source={require('../../Images/Revisar.png')}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonImage2,
                  { marginTop: heightPercentageToDP(10) },
                ]}
                onPress={() => {
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
                }}>
                <FastImage
                  source={require('../../Images/Salir.png')}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.buttonImage2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
            {!data || !data.answersArray.length ? (
              <View />
            ) : (
              data.answersArray.map((item, index) => {
                return (
                  <BottomLayout
                    key={'unique' + index}
                    text={index + 1}
                    status={item}
                  //isAttempt={item.studentAnswered}
                  // clickHandler={() => this.move(index)}
                  />
                );
              })
            )}
          </ScrollView>
        </View>

        <Modal
          transparent
          visible={this.state.showmodal}
          onRequestClose={() => this.setState({ showmodal: false })}  >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ showmodal: false })}
            style={{
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: "rgba(0,0,0,0.2)"

            }} >
            <View style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              width: "55%",
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",

            }}  >

              <FastImage
                source={{
                  uri: 'https://neoestudio.net/public/userImage/' + login?.data?.photo,
                }}
                resizeMode={FastImage.resizeMode.stretch}
                style={{
                  height: 60,
                  width: 60
                }}
              />
              <Text style={{
                color: "black",
                fontSize: 16,
                fontFamily: fonts.novaBold,
                marginLeft: 20
              }}>
                {`${login.data.name || ""} ha aprobado Inglés 12 con 18,33pts`}
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>


      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(ResultClass);
