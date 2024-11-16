import { Modal, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import DeviceInfo from 'react-native-device-info';
import { styles } from './index.styles'
import { images } from '../../constant';
import { widthPercentageToDP } from '../MakeMeResponsive';

const ConfirmationModal = ({ visible, onPressClose, onPressYes, title }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={onPressClose}>
            <TouchableOpacity
                style={styles.modalMain}
                activeOpacity={1}
                onPressOut={onPressClose}
            >
                <FastImage
                    source={images.email_box}
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
                        {title ?? '¿Quieres resetear este examen?'}
                    </Text>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.confirmBtn} onPress={onPressYes}>
                            <FastImage
                                source={images.si_btn_image}
                                style={styles.btnImage}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn} onPress={onPressClose}>
                            <FastImage
                                source={images.no_btn_image}
                                style={styles.btnImage}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                    </View>
                </FastImage>
            </TouchableOpacity>
        </Modal>
    )
}

export default ConfirmationModal

