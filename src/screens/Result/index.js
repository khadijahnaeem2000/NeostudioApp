import React, { useCallback, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import Orientation from 'react-native-orientation-locker';
import BottomLayout from './BottomLayout';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { fonts } from '../../utils';
import { IMAGE_URL } from '../../config';
import { Button } from '../../Component';
import { useFocusEffect } from '@react-navigation/native';
import { goBack, navigate } from '../../navigation/navigation_service';
import { images } from '../../constant';

const ResultClass = ({ route, navigation }) => {
  const {
    data,
    examID,
    image: isPsico,
    type,
    isRepasoImage,
    endTime
  } = route.params

  const { login } = useSelector(state => state.user)

  const [showModal, setShowModal] = useState(false)

  useFocusEffect(useCallback(() => { Orientation.lockToLandscape() }, []))

  return (
    <View style={styles.container}>
      <FastImage
        source={images.logo }
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.title}>{data.examName}</Text>

      <View style={styles.centerView}>


        <View style={styles.centerLeftView}>
          <View style={styles.row}>
            <Text style={styles.textUnBold}>{'Tiempo:'}</Text>
            <Text style={{
            }} >

              <Text style={styles.textBold}>{data.examDuration}</Text>
              <Text style={styles.smallText}>
                {"/" + data?.totalTime}
              </Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textUnBold}>{'Aciertos:'}</Text>
            <Text style={styles.textBold}>{data?.correctCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textUnBold}>{'Fallos:'}</Text>
            <Text style={styles.textBold}>{data?.wrongCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textUnBold}>{'Nulos:'}</Text>
            <Text style={styles.textBold}>{data?.nonAttemptedCount}</Text>
          </View>
          <View style={styles.row}>
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
                source={images.correct_image}
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
                source={images.cross_image}
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
          <Button
            title={'Revisar'}
            style={styles.revisar_btn}
            onPress={() => {
              navigate('Review', {
                id: examID,
                isImage: isPsico,
                type: type,
                fromReview: true,
                isRepasoImage: isRepasoImage,
              });
            }}
          />
          <Button
            title={'Salir'}
            style={styles.salir_btn}
            onPress={() => {
              if (type === 'exam') {
                goBack();
                goBack();
              } else if (type === 'reviewExam') {
                navigate('Repaso');
              } else if (type === 'personality') {
                navigate('Personality');
              } else if (type === 'all') {
                navigate('Activity');
              } else {
                navigation.popToTop();
              }
            }}
          />
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
                />
              );
            })
          )}
        </ScrollView>
      </View>

      <Modal
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}  >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowModal(false)}
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
                uri: IMAGE_URL + login?.data?.photo,
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
              {`${login?.data?.name || ""} ha aprobado Inglés 12 con 18,33pts`}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>


    </View>
  );
}

export default ResultClass
