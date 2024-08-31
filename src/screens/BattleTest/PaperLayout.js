import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import DeviceInfo from 'react-native-device-info';
import ScrollView2 from 'rn-faded-scrollview';
import { fonts } from '../../utils';
import Sound from 'react-native-sound';
let sound2, sound3;
export default class PaperLayout extends React.Component {

  render() {
    const {
      isAttempt,
      isOption1,
      option1,
      option2,
      option3,
      option4,
      question,
      clickHandler1,
      clickHandler2,
      clickHandler3,
      clickHandler4,
      isCorrect,
      description,
      correct,
    } = this.props;
    return (
      <View
        style={{
          width: '100%',
          height: '80%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView2
            contentContainerStyle={{ flexGrow: 1 }}
            allowStartFade={true}
            fadeColors={[
              'rgba(255,255,255, 0.18)',
              'rgba(255,255,255, 0.6)',
              'rgba(255,255,255, 0.9)',
            ]}
            fadeSize={20}>
            <View
              style={{
                marginRight: widthPercentageToDP(3),
                marginTop: widthPercentageToDP(-1),
              }}>
              <HTML
                contentWidth={Dimensions.get('screen').width}
                source={{ html: question.replace(/&nbsp;/g, '') }}
                classesStyles={{
                  regular: {
                    //fontSize: widthPercentageToDP(2.5),
                    fontFamily: fonts.novaRegular,
                    fontWeight: 'normal',
                    color: '#000',
                  },
                  bold: {
                    //fontSize: widthPercentageToDP(2.5),
                    fontFamily: fonts.novaBold,
                    fontWeight: 'normal',
                    color: '#000',
                  },
                  round: {
                    //fontSize: widthPercentageToDP(2.5),
                    fontFamily: fonts.elegance,
                    color: '#000',
                  },
                }}
                tagsStyles={{
                  a: {
                    textDecorationLine: "none"
                  },
                  p: {
                    padding: 6,
                    textAlign: 'justify',
                  },
                  span: {
                    //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                    flexDirection: 'row',
                  },
                  tap: {
                    fontSize: DeviceInfo.isTablet()
                      ? widthPercentageToDP(2)
                      : widthPercentageToDP(1.5),
                  },
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: DeviceInfo.isTablet()
                  ? heightPercentageToDP(0.5)
                  : heightPercentageToDP(-2),
                marginRight: widthPercentageToDP(3),
              }}
              disabled={isAttempt ? true : false}
              onPress={clickHandler1}>
              {isCorrect === 'a' || isCorrect === 'a y b' ? (
                <Image
                  style={{
                    width: widthPercentageToDP(3),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode="stretch"
                  source={require('../../Images/correct.png')}
                />
              ) : isOption1 === 'answer1' ? (
                <Image
                  style={{
                    width: widthPercentageToDP(3),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode="stretch"
                  source={require('../../Images/cross.png')}
                />
              ) : (
                <View
                  style={{
                    width: widthPercentageToDP(3),
                    height: widthPercentageToDP(3),
                  }}
                />
              )}
              <View
                style={{
                  marginLeft: widthPercentageToDP(0.5),
                  marginRight: widthPercentageToDP(5),
                }}>
                <HTML
                  contentWidth={Dimensions.get('screen').width}
                  source={{ html: option1.replace(/&nbsp;/g, '') }}
                  classesStyles={{
                    regular: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.novaRegular,
                      color: '#000',
                      //fontWeight: 'normal'
                    },
                    bold: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.novaBold,
                      fontWeight: 'normal',
                      color: '#000',
                    },
                    round: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.elegance,
                      color: '#000',
                    },
                  }}
                  tagsStyles={{
                    a: {
                      textDecorationLine: "none"
                    },
                    p: {
                      textAlign: 'justify',
                      padding: 10,
                    },
                    span: {
                      //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                      flexDirection: 'row',
                    },
                    tap: {
                      fontSize: DeviceInfo.isTablet()
                        ? widthPercentageToDP(2)
                        : widthPercentageToDP(1.5),
                    },
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: DeviceInfo.isTablet()
                  ? heightPercentageToDP(0.5)
                  : heightPercentageToDP(-3),
                marginRight: widthPercentageToDP(3),
              }}
              disabled={isAttempt ? true : false}
              onPress={clickHandler2}>
              {isCorrect === 'b' || isCorrect === 'a y b' ? (
                <Image
                  style={{
                    width: widthPercentageToDP(3),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode="stretch"
                  source={require('../../Images/correct.png')}
                />
              ) : isOption1 === 'answer2' ? (
                <Image
                  style={{
                    width: widthPercentageToDP(3),
                    height: widthPercentageToDP(3),
                  }}
                  resizeMode="stretch"
                  source={require('../../Images/cross.png')}
                />
              ) : (
                <View
                  style={{
                    width: widthPercentageToDP(3),
                    height: widthPercentageToDP(3),
                  }}
                />
              )}
              <View
                style={{
                  marginLeft: widthPercentageToDP(0.5),
                  marginRight: widthPercentageToDP(5),
                }}>
                <HTML
                  contentWidth={Dimensions.get('screen').width}
                  source={{ html: option2.replace(/&nbsp;/g, '') }}
                  classesStyles={{
                    regular: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.novaRegular,
                      color: '#000',
                      //fontWeight: 'normal'
                    },
                    bold: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.novaBold,
                      fontWeight: 'normal',
                      color: '#000',
                    },
                    round: {
                      //fontSize: widthPercentageToDP(2.5),
                      fontFamily: fonts.elegance,
                      color: '#000',
                    },
                  }}
                  tagsStyles={{
                    a: {
                      textDecorationLine: "none"
                    },
                    p: {
                      textAlign: 'justify',
                      padding: 10,
                    },
                    span: {
                      //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                      flexDirection: 'row',
                    },
                    tap: {
                      fontSize: DeviceInfo.isTablet()
                        ? widthPercentageToDP(2)
                        : widthPercentageToDP(1.5),
                    },
                  }}
                />
              </View>
            </TouchableOpacity>
            {option3 !== '' && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: DeviceInfo.isTablet()
                    ? heightPercentageToDP(0.5)
                    : heightPercentageToDP(-3),
                  marginRight: widthPercentageToDP(3),
                }}
                disabled={isAttempt ? true : false}
                onPress={clickHandler3}>
                {isCorrect === 'c' || isCorrect === 'c y d' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer3' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                    marginRight: widthPercentageToDP(5),
                  }}>
                  <HTML
                    contentWidth={Dimensions.get('screen').width}
                    source={{ html: option3.replace(/&nbsp;/g, '') }}
                    classesStyles={{
                      regular: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaRegular,
                        color: '#000',
                        //fontWeight: 'normal'
                      },
                      bold: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaBold,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      round: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.elegance,
                        color: '#000',
                      },
                    }}
                    tagsStyles={{
                      a: {
                        textDecorationLine: "none"
                      },
                      p: {
                        textAlign: 'justify',
                        padding: 10,
                      },
                      span: {
                        //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                        flexDirection: 'row',
                      },
                      tap: {
                        fontSize: DeviceInfo.isTablet()
                          ? widthPercentageToDP(2)
                          : widthPercentageToDP(1.5),
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
            {option4 !== '' && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: DeviceInfo.isTablet()
                    ? heightPercentageToDP(0.5)
                    : heightPercentageToDP(-3),
                  marginRight: widthPercentageToDP(3),
                }}
                disabled={isAttempt ? true : false}
                onPress={clickHandler4}>
                {isCorrect === 'd' || isCorrect === 'c y d' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : isOption1 === 'answer4' ? (
                  <Image
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={{
                      width: widthPercentageToDP(3),
                      height: widthPercentageToDP(3),
                    }}
                  />
                )}
                <View
                  style={{
                    marginLeft: widthPercentageToDP(0.5),
                    marginRight: widthPercentageToDP(5),
                  }}>
                  <HTML
                    contentWidth={Dimensions.get('screen').width}
                    source={{ html: option4.replace(/&nbsp;/g, '') }}
                    classesStyles={{
                      regular: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaRegular,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      bold: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.novaBold,
                        fontWeight: 'normal',
                        color: '#000',
                      },
                      round: {
                        //fontSize: widthPercentageToDP(2.5),
                        fontFamily: fonts.elegance,
                        color: '#000',
                      },
                    }}
                    tagsStyles={{
                      a: {
                        textDecorationLine: "none"
                      },
                      p: {
                        textAlign: 'justify',
                        padding: 10,
                      },
                      span: {
                        //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                        flexDirection: 'row',
                      },
                      tap: {
                        fontSize: DeviceInfo.isTablet()
                          ? widthPercentageToDP(2)
                          : widthPercentageToDP(1.5),
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
            {isOption1 && (
              <View
                style={{
                  marginLeft: widthPercentageToDP(0),
                  marginRight: widthPercentageToDP(5),
                  marginTop: DeviceInfo.isTablet()
                    ? widthPercentageToDP(1)
                    : widthPercentageToDP(-1),
                }}>
                <HTML
                  contentWidth={Dimensions.get('screen').width}
                  source={{ html: description }}
                  classesStyles={{
                    regular: {
                      //fontSize: widthPercentageToDP(2),
                      fontFamily: fonts.novaRegular,
                      color: '#000',
                    },
                    bold: {
                      //fontSize: widthPercentageToDP(2),
                      fontFamily: fonts.novaBold,
                      fontWeight: 'normal',
                      color: '#000',
                    },
                    round: {
                      //fontSize: widthPercentageToDP(2),
                      fontFamily: fonts.elegance,
                      color: '#000',
                    },
                  }}
                  tagsStyles={{
                    a: {
                      textDecorationLine: "none"
                    },
                    p: {
                      padding: 6,
                      //textAlign: "justify"
                    },
                    span: {
                      //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                      flexDirection: 'row',
                    },
                    tap: {
                      fontSize: DeviceInfo.isTablet()
                        ? widthPercentageToDP(2)
                        : widthPercentageToDP(1.5),
                    },
                  }}
                />
              </View>
            )}
          </ScrollView2>
        </View>
      </View>
    );
  }
}
