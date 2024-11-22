import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { styles } from './styles';
import Header from '../../Component/Header';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import Items from '../../Component/CurrentBattle';
import { getAllActiveBattle, joinMyBattle } from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';
import { goBack, navigate } from '../../navigation/navigation_service';
import { Container, LoaderModal } from '../../Component';

const Battle = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoading(true);
    const result = await getAllActiveBattle(login?.data?.id, login?.data?.type);
    setLoading(false);
    if (result.status === 'Successfull') {
      setResponse(result?.data);
    }
  };

  useFocusEffect(
    useCallback(() => {

      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToPortrait();
      }

    }, []))

  return (
    <Container title={'Tests a la carta'} >

      {!response || !response.length ? (
        <View />
      ) : (
        <FlatList
          data={response}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Items
                userImage={item.photo}
                key={'unique' + index}
                ActiveUsers={item.ActiveUsers}
                name={item.username}
                FolderDetails={item.FolderDetails}
                isActive={true}
                clickHandler={() => {
                  Orientation.unlockAllOrientations();
                  dispatch(
                    joinMyBattle(
                      login?.data?.id,
                      login?.data?.type,
                      item.id,
                      null,
                      null,
                      null,
                    ),
                  );
                }}
              />
            );
          }}
        />
      )}

      <TouchableOpacity
        onPress={() => (
          Orientation.unlockAllOrientations(),
          navigate('CreateBatlle')
        )}
        style={styles.createBtn}>
        <FastImage
          source={require('../../Images/createBattle.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.createBtn}
        />
      </TouchableOpacity>

      <LoaderModal visible={isLoading || AuthLoading} />
    </Container>
  );
};

export default Battle;
