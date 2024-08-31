import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
} from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import {
  getUserProgramsActivites,
  updateCompleteActivites,
  removeUserActivites,
  saveActivityId,
  resetAllPrograms,
} from '../../Redux/action';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import Activities from '../../Component/Activity';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fonts } from '../../utils';
import { navigate } from '../../utils/naviagtion_service';
import { useFocusEffect } from '@react-navigation/native';

const Programs = ({ navigation }) => {
  const dispatch = useDispatch();
  const listRef = useRef()
  const refsArray = useRef([]);

  const login = useSelector(state => state.user.login);
  const activityId = useSelector(state => state.user.activityId);
  const activityName = useSelector(state => state.user.activityName);


  const [isLoading, setLoading] = useState(false);
  const [showToast, hideToast] = useState(false);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);


  const _fetchData = async () => {
    setLoading(true);
    const result = await getUserProgramsActivites(
      login?.data?.id,
      activityId,
      page,
    );
    await setResponse(result);
    await setLoading(false);
  };
  const _fetchData2 = async () => {
    setLoading(true);
    const result = await getUserProgramsActivites(
      login?.data?.id,
      activityId,
      page,
    );
    await setResponse([...response, ...result]);
    await setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      _fetchData();
    }, [])
  )

  useEffect(() => {
    if (page) {
      _fetchData2();
    }
  }, [page]);

  useEffect(() => {
    if (showToast)
      setTimeout(() => {
        hideToast(false);
      }, 1000);
  }, [showToast]);

  useFocusEffect(
    useCallback(
      () => {
        const locked = Orientation.isLocked();
        if (!locked) {
          Orientation.lockToPortrait();
        }

      }, []))

  const deleteItem = async (id, index) => {

    console.log("yahna ayayay")
    await deleteApi(id);
    const newData = [...response];
    // const prevIndex = response.findIndex(item => item.activityId === id);
    // newData.splice(prevIndex, 1);
    setResponse(newData?.filter(item => item.activityId !== id));
    console.log("refsArray.current[index].close();", refsArray.current[index].close())
    refsArray.current[index].close();
    setLoading(false)
  };
  const deleteApi = async id => {
    try {
      setLoading(true)
      const result = await removeUserActivites(login?.data?.id, id, 'delete');
      console.log("result", result)
      if (result.status === 'Success') {
        hideToast(true);

      }
    } catch (error) {
      setLoading(false)
      console.log("errorrr", error)
    }
  };
  const loadMoreData = () => {
    setPage(page + 1);
  };
  const _resetPrograms = async () => {
    setLoading(true);
    const result = await resetAllPrograms(login?.data?.id, activityId);
    setLoading(false);
    if (result?.status === 'Successfull') {
      _fetchData();
    }
  };


  const LeftItem = () => {
    return (
      <View style={styles.leftItem}>
      </View>
    );
  };

  console.log("isis scrrene meheh")

  return (
    <View
      style={[styles.container, { backgroundColor: '#f2f3f3' }]}
    >
      <GestureHandlerRootView>

        <View style={styles.headerTop}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginLeft: widthPercentageToDP(5) }}
              onPress={() => {
                dispatch(saveActivityId(''));
                navigate('Actividad');
              }}>
              <FastImage
                style={{
                  width: widthPercentageToDP(11),
                  height: widthPercentageToDP(11),
                }}
                source={require('../../Images/Actividades_icon.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => {
                _resetPrograms();
              }}>
              <FastImage
                style={{
                  width: widthPercentageToDP(10),

                  height: widthPercentageToDP(10),
                }}
                source={require('../../Images/loader.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
          <FastImage
            style={{
              width: widthPercentageToDP(25),
              height: widthPercentageToDP(25),
              marginTop: heightPercentageToDP(2),
              marginRight: widthPercentageToDP(2),
            }}
            source={require('../../Images/logo2.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={[
              styles.headerText,
              {
                position: 'absolute',
                left: '33%',
                //right: '0%',
                top: '30%',
                //bottom:
              },
            ]}>
            {!activityName ? '' : activityName.toUpperCase()}
          </Text>
        </View>

        <View style={styles.directoryView}>
          {!response || !response.length ? (
            <View />
          ) : (
            <FlatList
              onEndReachedThreshold={0.2}
              onEndReached={() => loadMoreData()}
              data={response}
              ref={listRef}
              style={{ marginTop: heightPercentageToDP(3) }}
              keyExtractor={(item, index) => 'unique' + index}
              renderItem={({ item, index }) => {
                return (
                  <Swipeable
                    ref={ref => (refsArray.current[index] = ref)}
                    onEnded={() => console.log("end ho gayyasdasd")}
                    onSwipeableLeftOpen={() => {
                      // deleteItem(item?.activityId, index)
                      console.log("asdjbasdasdasd", activityId)
                    }}
                    onActivated={() => console.log("activitae ho gfaya")}
                    onBegan={() => console.log("began hua")}
                    onCancelled={() => console.log("canacleled hau")}
                    onSwipeableOpen={(data) => {
                      deleteItem(item?.activityId, index)
                      console.log("onSwipeableOpen", data)
                    }}
                    onFailed={() => console.log("onFailed")}
                    onSwipeableClose={() => console.log("onSwipeableClose")}
                    onSwipeableCloseStartDrag={() => console.log("onSwipeableCloseStartDrag")}
                    onSwipeableOpenStartDrag={() => console.log("onSwipeableOpenStartDrag")}
                    onSwipeableWillClose={() => console.log("onSwipeableWillClose")}
                    onSwipeableWillOpen={() => console.log("onSwipeableWillOpen")}
                    onSwipeableRightOpen={() => console.log('Swiped right')}
                    renderLeftActions={() => <LeftItem />}
                    friction={2}

                    leftThreshold={30}
                  //onSwipeableOpen={closeRow(index)}
                  //leftThreshold={80}

                  >
                    <Activities
                      type={item.type}
                      name={item.name}
                      title={item.title}
                      activityName={item.activityName}
                      isCompleted={item.isCompleted}
                      studentExamStatus={item.studentExamStatus}
                      clickHandler={() => {
                        if (item.type === 'pdf') {
                          Orientation.unlockAllOrientations();
                          updateCompleteActivites(login?.data?.id, item.activityId);
                          setPage(1);
                          navigate('PdfView', {
                            url: item.file,
                          });
                        } else if (item.type === 'video') {
                          if (item?.vimeolink == null) {
                            Alert.alert('Enlace de vídeo no disponible')
                          } else {
                            Orientation.unlockAllOrientations();
                            updateCompleteActivites(login?.data?.id, item.activityId);
                            setPage(1);
                            navigate('TestVideo', {
                              url: 'https://neoestudio.net/' + item.material,
                              vimeoLink: item?.vimeolink,
                              id: login?.data?.id,
                            });
                          }
                        } else if (item.type === 'audio') {
                          Orientation.unlockAllOrientations();
                          updateCompleteActivites(login?.data?.id, item.activityId);
                          setPage(1);
                          let data = [];
                          data.push({
                            artist: !item.name ? item.title : item.name,
                            artwork: 'http://neoestudio.net/neostudio/Logo.png',
                            id: 0,
                            isActive: false,
                            title: !item.name ? item.title : item.name,
                            url: 'http://neoestudio.net/' + item.material,
                          });
                          navigate('AudioActivity', {
                            data: data,
                          });
                        } else {
                          Orientation.unlockAllOrientations();
                          updateCompleteActivites(login?.data?.id, item.activityId);
                          setPage(1);
                          if (item.type === 'exam') {
                            if (item.studentStatus === 'Habilitado') {
                              navigate('Test', {
                                examsId: item.id,
                                totalTime: item.examDuration,
                                isPsico: item.name.includes('Psico')
                                  ? true
                                  : false,
                                type: 'all',
                                isReshedule: 'no',
                              });
                            } else if (item.studentExamStatus === 'end') {
                              navigate('Review', {
                                id: item.studentExamRecordId,
                                isImage: item.name.includes('Psico')
                                  ? true
                                  : false,
                                type: 'all',
                              });
                            }
                          } else if (item.type === 'review') {
                            if (item.studentStatus === 'Habilitado') {
                              navigate('Test', {
                                examsId: item.id,
                                totalTime: item.examDuration,
                                isPsico: false,
                                type: 'all',
                                isReshedule: 'no',
                              });
                            } else if (item.studentExamStatus === 'end') {
                              navigate('Review', {
                                id: item.studentExamRecordId,
                                isImage: false,
                                type: 'all',
                              });
                            }
                          }
                        }
                      }}
                    />
                  </Swipeable>
                );
              }}
            />
          )}
        </View>
        {isLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {showToast && (
          <Modal
            visible={showToast}
            animationType="slide"
            transparent={true}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => { }}>
            <View style={{ flex: 1 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#cacaca', '#e9e9e9']}
                style={{
                  width: widthPercentageToDP(90),
                  height: heightPercentageToDP(7),
                  borderWidth: widthPercentageToDP(0.3),
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: '5%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.novaBold,
                    fontSize: widthPercentageToDP(4),
                    color: '#000',
                  }}>
                  {'¡Enhorabuena!'}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.elegance,
                    fontSize: widthPercentageToDP(4),
                    color: '#000',
                  }}>
                  {'Has completado y archivado esta tarea.'}
                </Text>
              </LinearGradient>
            </View>
          </Modal>
        )}
      </GestureHandlerRootView>
    </View>
  );
};

export default Programs;

{
  /* <SwipeListView
                        data={response}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        disableRightSwipe
                        onRowDidOpen={onRowDidOpen}
                        leftActivationValue={100}
                        rightActivationValue={-200}
                        leftActionValue={0}
                        rightActionValue={-500}
                        onLeftAction={onLeftAction}
                        onRightAction={onRightAction}
                        onLeftActionStatusChange={onLeftActionStatusChange}
                        onRightActionStatusChange={onRightActionStatusChange}
                    /> */
}
