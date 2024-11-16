import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Program from '../../Component/Programs';
import { Container, LoaderModal, SizedBox } from '../../Component';
import { Text } from 'react-native-svg';
import ActividadFunctional from "./index.function"

const Actividad = () => {
  const {
    counter,
    loading,
    pageSelected,
    user_programs,
    buttonControl,
    onPressButton
  } = ActividadFunctional()

  return (
    <Container title="Actividades" >


      <Text style={styles.heading} >Actividades</Text>
      {pageSelected !== 0 && (
        <TouchableOpacity
          onPress={() => {
            buttonControl('left');
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
            buttonControl('right');
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
          {!user_programs || !user_programs?.length ? (
            <View />
          ) : (
            <Program
              clickHandler={onPressButton}
              image={user_programs?.[pageSelected].image}
              description={user_programs?.[pageSelected].desc}
            />
          )}
          <SizedBox />
        </ScrollView>
      </View>

      <LoaderModal visible={loading} />
    </Container>
  );
};

export default Actividad;
