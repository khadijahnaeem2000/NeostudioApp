import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from '../MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import { fonts } from '../../utils';

class ModalBox extends React.Component {
  render() {
    const {isOpen, closeBox, yesClick, noClick, myText} = this.props;
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
              source={require('../../screens/Home/assets/email_box.png')}
              resizeMode={FastImage.resizeMode.stretch}
              style={[
                styles.quesBox,
                {
                  minHeight: DeviceInfo.isTablet()
                    ? widthPercentageToDP(35)
                    : widthPercentageToDP(45),
                },
              ]}>
              <Text style={styles.text1}>
                {!myText ? '¿Quieres resetear este examen?' : myText}
              </Text>
              <View style={styles.bottomView}>
                <TouchableOpacity style={styles.confirmBtn} onPress={yesClick}>
                  <FastImage
                    source={require('../../Images/Si.png')}
                    style={styles.btnImage}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmBtn} onPress={noClick}>
                  <FastImage
                    source={require('../../Images/No.png')}
                    style={styles.btnImage}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>
            </FastImage>
        </TouchableOpacity>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.4)'
  },
  text1: {
    marginTop: widthPercentageToDP(7),
    color: '#252525',
    fontFamily: fonts.novaBold,
    //marginLeft: widthPercentageToDP(-4),
    fontSize: widthPercentageToDP(4),
    width: widthPercentageToDP(70),
    padding: widthPercentageToDP(2),
    textAlign: 'center',
  },
  quesBox: {
    width: widthPercentageToDP(95),
    alignItems: 'center',
    //justifyContent: "center"
  },
  confirmBtn: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(5),
    marginTop: heightPercentageToDP(0),
    marginBottom: widthPercentageToDP(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  btnImage: {
    width: widthPercentageToDP(43),
    height: heightPercentageToDP(20),
    //marginTop:heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-around',
  },
});
export default ModalBox;
