import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { images } from '../../constant';
import { Container } from '../../Component';
import { navigate } from '../../navigation/navigation_service';

const Battle = () => {

  const activeBattles = () => {
    navigate('ActiveBattle');
  };

  const createBattles = () => {
    navigate('CreateBatlle');
  };

  return (
    <Container title={'Tests a la carta'} >
      <View style={styles.directoryView}>
        <TouchableOpacity onPress={() => activeBattles()} style={styles.btn}>
          <FastImage
            source={images.btn_background_image}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.btnTxt}>{'Batallas activas'}</Text>
          </FastImage>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => createBattles()} style={styles.btn}>
          <FastImage
            source={images.btn_background_image}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.btnTxt}>{'Nueva batalla'}</Text>
          </FastImage>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => finishBattles()} style={styles.btn}>
          <FastImage
            source={images.btn_background_image}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.btnTxt}>{'Batallas finalizadas'}</Text>
          </FastImage>
        </TouchableOpacity>
      </View>

    </Container>
  );
};

export default Battle;
