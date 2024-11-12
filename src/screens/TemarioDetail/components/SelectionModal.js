import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { images } from '../../../constant'
import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { fonts } from '../../../utils';

const SelectionModal = ({ visible, onPressClose, onPressHorizontal, onPressVertical }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={onPressClose}>
            <TouchableOpacity
                style={styles.main_view}
                activeOpacity={1}
                onPressOut={onPressClose}>
                <TouchableWithoutFeedback>
                    <FastImage
                        source={images.email_box}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={[
                            styles.quesBox,
                            {
                                height: DeviceInfo.isTablet()
                                    ? widthPercentageToDP(45)
                                    : widthPercentageToDP(40),
                            },
                        ]}>
                        <Text style={styles.text1}>
                            {'Elige cómo quieres leer el documento.'}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '80%',
                                justifyContent: 'space-around',
                            }}>
                            <TouchableOpacity
                                style={styles.confirmBtn}
                                onPress={onPressHorizontal}>
                                <FastImage
                                    source={images.horizontal_btn_image}
                                    style={styles.btnImage}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmBtn}
                                onPress={onPressVertical}>
                                <FastImage
                                    source={images.vertical_btn_image}
                                    style={styles.btnImage}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                        </View>
                    </FastImage>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default SelectionModal

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerModal: {
        width: widthPercentageToDP(95),
        height: widthPercentageToDP(40),
        marginLeft: widthPercentageToDP(4),
    },
    quesBox: {
        width: widthPercentageToDP(95),
        alignItems: 'center',
        //justifyContent: "center"
    },
    text1: {
        marginTop: widthPercentageToDP(7),
        color: '#252525',
        fontFamily: fonts.novaBold,
        marginLeft: widthPercentageToDP(-4),
        fontSize: widthPercentageToDP(5),
        width: widthPercentageToDP(70),
        padding: widthPercentageToDP(2),
        textAlign: 'justify',
    },
    btnText: {
        color: '#ffff',
        fontFamily: fonts.novaBold,
        textAlign: 'justify',
        fontSize: widthPercentageToDP(3),
    },
    btnImage: {
        width: widthPercentageToDP(43),
        height: heightPercentageToDP(20),
        //marginTop:heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'center',
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
})