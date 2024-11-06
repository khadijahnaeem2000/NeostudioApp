import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { fonts } from '../../../utils';
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { images, SIZES } from '../../../constant';

const EmailModal = ({ visible, onPressClose }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.main_view}>
                <FastImage
                    source={images.email_box}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.sub_view}
                >
                    <Text style={styles.title}>
                        {
                            "Este módulo no está habilitado en la modalidad que te has suscrito. Si quieres tener acceso tienes que mejorar tu suscripción iniciando sesión en nuestra página web."
                        }
                    </Text>
                    <TouchableOpacity
                        style={styles.btn_view}
                        onPress={onPressClose}
                    >
                        <FastImage
                            source={images.confirm_btn_image}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.btn}
                        />
                    </TouchableOpacity>
                </FastImage>
            </View>
        </Modal>
    )
}

export default EmailModal

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
    },
    sub_view: {
        alignItems: 'center',
        padding: SIZES.padding
    },
    title: {
        color: '#000',
        fontFamily: fonts.novaBold,
        fontSize: widthPercentageToDP(4.5),
        textAlign: "center",
        marginTop: SIZES.padding2
    },
    btn_view: {
        width: "80%",
        height: 80,
        marginTop: heightPercentageToDP(2),
    },
    btn: {
        width: "100%",
        height: "100%"
    },

})