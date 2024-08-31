import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { styles } from './styles';
import Header from '../../Component/Header';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import { getUserPrograms, saveActivityId } from '../../Redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Program from '../../Component/Programs';
import { useFocusEffect } from '@react-navigation/native';

const Programs = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [pageSelected, setPageSelected] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    _fetchData();
  }, []);

  useEffect(() => {
    if (response) {
      setCounter(response.length - 1);
    }
  }, [response]);
  const _fetchData = async () => {
    setLoading(true);
    const result = await getUserPrograms(login.data.type);
    await setResponse(result.data);
    await setLoading(false);
  };
  const _buttonControl = type => {
    const count = response.length - 1;
    if (type === 'left') {
      if (count == 0) {
        return;
      } else {
        setPageSelected(pageSelected - 1);
      }
    } else {
      if (count <= pageSelected) {
        return;
      } else {
        setPageSelected(pageSelected + 1);
      }
    }
  };

  function handleBackButtonClick() {
    props.navigation.goBack()
    return false;
  }
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    }, [])
  )

  return (
    <FastImage
      source={require('../../Images/bg.png')}
      resizeMode={FastImage.resizeMode.stretch}
      style={styles.container}>
      <FastImage
        style={styles.logo}
        source={Platform.OS === 'android' ?
          require('../../Images/veoestudio.png')
          : require('../../Images/ios_logo.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Header
        iconName="left"
        leftClick={() => props.navigation.navigate('HomeScreen')}
        title="Actividades"
      />
      {pageSelected !== 0 && (
        <TouchableOpacity
          onPress={() => {
            _buttonControl('left');
          }}
          style={styles.leftBtn}>
          <FastImage
            source={require('../../Images/Left_arrow.png')}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.vector}
          />
        </TouchableOpacity>
      )}
      {counter !== pageSelected && (
        <TouchableOpacity
          onPress={() => {
            _buttonControl('right');
          }}
          style={styles.rightBtn}>
          <FastImage
            source={require('../../Images/Right_arrow.png')}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.vector}
          />
        </TouchableOpacity>
      )}
      <View style={styles.directoryView}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {!response || !response.length ? (
            <View />
          ) : (
            <Program
              clickHandler={() => {
                Orientation.unlockAllOrientations();
                dispatch(
                  saveActivityId(
                    response[pageSelected].id,
                    response[pageSelected].name,
                  ),
                );
                props.navigation.navigate('Activity', {
                  activityName: response[pageSelected].name,
                });
              }}
              image={response[pageSelected].image}
              description={response[pageSelected].desc}
            />
          )}
        </ScrollView>
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
    </FastImage>
  );
};

export default Programs;
