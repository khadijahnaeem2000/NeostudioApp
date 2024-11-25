import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
  Platform,
} from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import {
  getUserProgramsActivites,
  updateCompleteActivites,
  removeUserActivites,
  saveActivityId,
  resetAllPrograms,
} from '../../Redux/action';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fonts } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { goBack, navigate } from '../../navigation/navigation_service';
import { COLORS, images } from '../../constant';
import { Container, LoaderModal, SingleFolderView } from '../../Component';

const Programs = () => {
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


  const fetchData = async () => {
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
      fetchData();
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


  const deleteItem = async (id, index) => {

    await deleteApi(id);
    const newData = [...response];
    setResponse(newData?.filter(item => item.activityId !== id));
    refsArray.current[index].close();
    setLoading(false)
  };
  const deleteApi = async id => {
    try {
      setLoading(true)
      const result = await removeUserActivites(login?.data?.id, id, 'delete');
      if (result.status === 'Success') {
        hideToast(true);

      }
    } catch (error) {
      setLoading(false)
    }
  };
  const loadMoreData = () => {
    setPage(page + 1);
  };
  const resetPrograms = async () => {
    setLoading(true);
    const result = await resetAllPrograms(login?.data?.id, activityId);
    setLoading(false);
    if (result?.status === 'Successfull') {
      fetchData();
    }
  };


  const getImage = (type, name) => {
    let image;
    type === 'video' ?
      image = images?.video_icon_image
      : type === 'pdf' ?
        image = images?.pdf_image
        : type === 'audio' ?
          image = images?.audio_icon_image
          : type === 'review' ?
            image = images?.complete_exam
            : type === 'exam' ?
              name?.includes('Orto') ?
                image = images?.orto_exam_image
                : name?.includes('Inglés') ?
                  image = images?.english_exam_image
                  : name?.includes('Psico') ?
                    image = images?.psico_exam_image
                    : name?.includes('Gramática') ?
                      image = images?.orto_exam_image
                      : image = images?.cono_exam_image
              : type === 'personality' ?
                image = images?.complete_exam
                : image = images?.complete_exam
    return image
  }

  const onPressTab = (item) => {
    if (item.type === 'pdf') {
      updateCompleteActivites(login?.data?.id, item.activityId);
      setPage(1);
      navigate('PdfView', {
        url: item.file,
      });
    } else if (item.type === 'video') {
      if (item?.vimeolink == null) {
        Alert.alert('Enlace de vídeo no disponible')
      } else {
        updateCompleteActivites(login?.data?.id, item.activityId);
        setPage(1);
        navigate('VideoPlayer', {
          url: 'https://neoestudio.net/' + item.material,
          vimeoLink: item?.vimeolink,
          id: login?.data?.id,
        });
      }
    } else if (item.type === 'audio') {
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
      updateCompleteActivites(login?.data?.id, item.activityId);
      setPage(1);
      if (item.type === 'exam') {
        if (item.studentStatus === 'Habilitado') {
          navigate('Test', {
            examsId: item.id,
            totalTime: item.examDuration,
            isPsico: item.name?.includes('Psico')
              ? true
              : false,
            type: 'all',
            isReshedule: 'no',
          });
        } else if (item.studentExamStatus === 'end') {
          navigate('Review', {
            id: item.studentExamRecordId,
            isImage: item.name?.includes('Psico')
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
  }

  const renderLeftActions = (progress, dragX) => {
    return (
      <View >
        <Text style={{ color: COLORS.transparent }}>Helloo</Text>
      </View>
    );
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <View >
        <Text style={{ color: COLORS.transparent }}>Helloo</Text>
      </View>
    );
  };

  return (
    <Container isHome title={"Activities"}
      HomeView={() => (
        <View style={styles.headerTop}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginLeft: widthPercentageToDP(5) }}
              onPress={() => {
                dispatch(saveActivityId(''));
                goBack()
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
              onPress={() => resetPrograms()}>
              <FastImage
                style={{
                  width: widthPercentageToDP(10),

                  height: widthPercentageToDP(10),
                }}
                source={images.loader}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={styles.headerText}>
            {!activityName ? '' : activityName.toUpperCase()}
          </Text>
        </View>
      )}
    >

      <GestureHandlerRootView>
        <View style={styles.directoryView}>
          {!response || !response.length ? (
            <View />
          ) : (
            <FlatList
              onEndReachedThreshold={0.2}
              onEndReached={() => loadMoreData()}
              data={response}
              ref={listRef}
              keyExtractor={(item, index) => 'unique' + index}
              renderItem={({ item, index }) => {
                return (
                  <Swipeable
                    ref={ref => (refsArray.current[index] = ref)}
                    onEnded={() => { }}
                    // onSwipeableLeftOpen={() => { deleteItem(item?.activityId, index)}}
                    // onSwipeableRightOpen={() => { deleteItem(item?.activityId, index)}}
                    onActivated={() => { }}
                    onBegan={() => { }}
                    onCancelled={() => { }}
                    onSwipeableOpen={(data) => { deleteItem(item?.activityId, index) }}
                    onFailed={() => { }}

                    renderLeftActions={renderLeftActions} // Render left actions
                    renderRightActions={renderRightActions} // Render right actions
                    onSwipeableClose={() => { }}
                    onSwipeableCloseStartDrag={() => { }}
                    onSwipeableOpenStartDrag={() => { }}
                    onSwipeableWillClose={() => { }}
                    onSwipeableWillOpen={() => { }}
                    friction={Platform.OS === 'ios' ? 1 : 2}
                    rightThreshold={50}
                    leftThreshold={50}
                  //onSwipeableOpen={closeRow(index)}
                  //leftThreshold={80}
                  >
                    <SingleFolderView
                      image={getImage(item?.type, item?.name)}
                      onPress={() => onPressTab(item)}
                      textStyle={{
                        fontFamily: item?.studentExamStatus === 'end' ?
                          fonts.elegance
                          : item?.isCompleted === 'no' ?
                            fonts.novaBold : fonts.novaRegular,
                      }}
                      title={
                        item?.activityName !== "" ? item?.activityName
                          : item?.title !== "" ? item?.title
                            : item?.name !== "" ? item?.name : ""
                      }

                    />
                    {/* <Activities
                      type={item.type}
                      name={item.name}
                      title={item.title}
                      activityName={item.activityName}
                      isCompleted={item.isCompleted}
                      studentExamStatus={item.studentExamStatus}
                    // clickHandler={onPressTab}
                    /> */}
                  </Swipeable>
                );
              }}
            />
          )}
        </View>
        <LoaderModal visible={isLoading} />
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
      </GestureHandlerRootView>
    </Container>

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
