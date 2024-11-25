import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { COLORS, images, SIZES } from '../../../constant'
import DeviceInfo from 'react-native-device-info';
import { widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { fonts } from '../../../utils';

const SelectionModal = ({ visible, onPressClose, onPressHorizontal, onPressVertical }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onPressClose}>
            <TouchableOpacity
                style={styles.main_view}
                activeOpacity={1}
                onPressOut={onPressClose}>
                <FastImage
                    source={images.modal_background_image}
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
                            style={styles.btn}
                            onPress={onPressHorizontal}>
                            <FastImage
                                source={images.btn_background_image}
                                style={styles.btnImage}
                                resizeMode={FastImage.resizeMode.contain}
                            >
                                <Text style={styles.btn_text} >Horizontal</Text>
                            </FastImage>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={onPressVertical}>
                            <FastImage
                                source={images.btn_background_image}
                                style={styles.btnImage}
                                resizeMode={FastImage.resizeMode.contain}
                            >
                                <Text style={styles.btn_text} >Vertical</Text>
                            </FastImage>
                        </TouchableOpacity>
                    </View>
                </FastImage>
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
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    quesBox: {
        width: widthPercentageToDP(95),
        alignItems: 'center',
    },
    text1: {
        marginTop: widthPercentageToDP(7),
        color: COLORS.white,
        fontFamily: fonts.novaBold,
        fontSize: SIZES.h15,
        textAlign: "center"
    },
    btn: {
        width: "48%",
        height: SIZES.padding * 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.padding * 2
    },
    btnImage: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_text: {
        color: '#ffff',
        fontFamily: fonts.novaBold,
        textAlign: 'justify',
        fontSize: widthPercentageToDP(3),
    },
})