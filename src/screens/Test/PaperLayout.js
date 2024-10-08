import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import DeviceInfo from 'react-native-device-info';
import ScrollView2 from 'rn-faded-scrollview';
import { fonts } from '../../utils';

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
      allowdescription,
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
            <Text style={styles.question} >{question.replace(/&nbsp;/g, '')}</Text>


            <TouchableOpacity
              style={styles.answer_row}
              disabled={allowdescription === 'True' ? true : false}
              onPress={clickHandler1}>
              {allowdescription === 'False' && isOption1 === 'answer1' ? (
                <Image
                  style={styles.arrow_image}
                  resizeMode="stretch"
                  source={require('../../Images/arrow.png')}
                />
              ) : allowdescription === 'True' ? (
                isCorrect === 'a' || isCorrect === 'a y b' ? (
                  <Image
                    style={styles.correct_image}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : allowdescription === 'True' && isOption1 === 'answer1' ? (
                  <Image
                    style={styles.correct_image}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={styles.correct_image}
                  />
                )
              ) : (
                <View
                  style={{
                    width: widthPercentageToDP(4),
                    height: widthPercentageToDP(3),
                    //marginLeft: widthPercentageToDP(2),
                  }}
                />
              )}
              <Text style={styles.answer}  >{option1.replace(/&nbsp;/g, '')}</Text>

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.answer_row}
              disabled={allowdescription === 'True' ? true : false}
              onPress={clickHandler2}>
              {allowdescription === 'False' && isOption1 === 'answer2' ? (
                <Image
                  style={styles.arrow_image}
                  resizeMode="stretch"
                  source={require('../../Images/arrow.png')}
                />
              ) : allowdescription === 'True' ? (
                isCorrect === 'b' || isCorrect === 'a y b' ? (
                  <Image
                    style={styles.correct_image}
                    resizeMode="stretch"
                    source={require('../../Images/correct.png')}
                  />
                ) : allowdescription === 'True' && isOption1 === 'answer2' ? (
                  <Image
                    style={styles.correct_image}
                    resizeMode="stretch"
                    source={require('../../Images/cross.png')}
                  />
                ) : (
                  <View
                    style={styles.correct_image}
                  />
                )
              ) : (
                <View style={styles.correct_image} />
              )}

              <Text style={styles.answer} >{option2.replace(/&nbsp;/g, '')}</Text>

            </TouchableOpacity>
            {option3 !== '' && (
              <TouchableOpacity
                style={styles.answer_row}
                disabled={allowdescription === 'True' ? true : false}
                onPress={clickHandler3}>
                {allowdescription === 'False' && isOption1 === 'answer3' ? (
                  <Image
                    style={styles.arrow_image}
                    resizeMode="stretch"
                    source={require('../../Images/arrow.png')}
                  />
                ) : allowdescription === 'True' ? (
                  isCorrect === 'c' || isCorrect === 'c y d' ? (
                    <Image
                      style={styles.correct_image}
                      resizeMode="stretch"
                      source={require('../../Images/correct.png')}
                    />
                  ) : allowdescription === 'True' && isOption1 === 'answer3' ? (
                    <Image
                      style={styles.correct_image}
                      resizeMode="stretch"
                      source={require('../../Images/cross.png')}
                    />
                  ) : (
                    <View
                      style={styles.correct_image}
                    />
                  )
                ) : (
                  <View
                    style={styles.correct_image}
                  />
                )}

                <Text style={styles.answer}  >{option3.replace(/&nbsp;/g, '')}</Text>

              </TouchableOpacity>
            )}
            {option4 !== '' && (
              <TouchableOpacity
                style={styles.answer_row}
                disabled={allowdescription === 'True' ? true : false}
                onPress={clickHandler4}>
                {allowdescription === 'False' && isOption1 === 'answer4' ? (
                  <Image
                    style={styles.arrow_image}
                    resizeMode="stretch"
                    source={require('../../Images/arrow.png')}
                  />
                ) : allowdescription === 'True' ? (
                  isCorrect === 'd' || isCorrect === 'c y d' ? (
                    <Image
                      style={styles.correct_image}
                      resizeMode="stretch"
                      source={require('../../Images/correct.png')}
                    />
                  ) : allowdescription === 'True' && isOption1 === 'answer4' ? (
                    <Image
                      style={styles.correct_image}
                      resizeMode="stretch"
                      source={require('../../Images/cross.png')}
                    />
                  ) : (
                    <View
                      style={styles.correct_image}
                    />
                  )
                ) : (
                  <View
                    style={styles.correct_image}
                  />
                )}

                <Text style={styles.answer}    >{option4.replace(/&nbsp;/g, '')}</Text>

              </TouchableOpacity>
            )}
            {allowdescription === 'True' && (

              <Text style={styles.description}  >{description}</Text>
            )}

            <View style={{ height: 20 }} />
          </ScrollView2>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  question: {
    marginTop: 20,
    fontSize: widthPercentageToDP(2),
    fontFamily: fonts.novaBold,
    color: "#000",
    marginLeft: 20,
    marginRight: widthPercentageToDP(3),
  },
  answer_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DeviceInfo.isTablet()
      ? heightPercentageToDP(1)
      : heightPercentageToDP(2.5),
    marginRight: widthPercentageToDP(3),
    gap: widthPercentageToDP(1)
  },
  answer: {
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(1.8),
    color: "#000",
    marginRight: widthPercentageToDP(5),
  },
  description: {
    fontFamily: fonts.novaRegular,
    fontSize: widthPercentageToDP(1.8),
    color: "#000",
    marginLeft: 20,
    marginRight: widthPercentageToDP(5),
    marginTop: widthPercentageToDP(1),
  },
  arrow_image: {
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(3.5),
  },
  correct_image: {
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(3),
  }
})
