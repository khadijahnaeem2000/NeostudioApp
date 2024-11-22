import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP } from '../MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import { fonts } from '../../utils';
import { COLORS, images, SIZES } from '../../constant';
import { Button, SizedBox } from '../index';

const ModalBox = ({
  isOpen,
  closeBox,
  yesClick,
  noClick,
  myText
}) => {
  return (
    <Modal
      transparent={true}
      visible={isOpen}
      animationType="slide"
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={() => {
      }}>
      <TouchableOpacity
        style={styles.modalMain}
        activeOpacity={1}
        onPressOut={closeBox}>

        <FastImage
          source={images.modal_background_image}
          resizeMode={FastImage.resizeMode.stretch}
          style={styles.quesBox}>
          <Text style={styles.text1}>
            {!myText ? '¿Quieres resetear este examen?' : myText}
          </Text>

          <SizedBox />

          <View style={styles.bottomView}>
            <Button
              style={styles.btnImage}
              title={'Si'}
              onPress={yesClick}
            />
            <Button
              style={styles.btnImage}
              title={'No'}
              onPress={noClick}
            />
          </View>
        </FastImage>
      </TouchableOpacity>
    </Modal>
  );

}
const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  text1: {
    marginTop: widthPercentageToDP(7),
    color: COLORS.white,
    fontFamily: fonts.novaBold,
    fontSize: widthPercentageToDP(4),
    textAlign: 'center',
  },
  quesBox: {
    width: widthPercentageToDP(95),
    alignItems: 'center',

  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.padding
  },
  btnImage: {
    width: "40%",
    height: SIZES.padding * 1.5,
  },

});
export default ModalBox;
