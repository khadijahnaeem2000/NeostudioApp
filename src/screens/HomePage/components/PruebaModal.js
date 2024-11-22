import { Linking, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive'
import { fonts } from '../../../utils'
import { COLORS, images, SIZES } from '../../../constant'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ImageBackground } from 'react-native'

const PruebaModal = ({ visible, onPressClose, login }) => {
    return (
        <Modal transparent visible={visible}  >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: "center", paddingHorizontal: SIZES.padding }} >
                <FastImage
                    source={images.modal_background_image}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: 20, width: "100%", alignSelf: "center", overflow: "hidden" }} >

                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={onPressClose}
                        style={{
                            height: 35,
                            width: 35,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            alignSelf: 'flex-end',
                            marginTop: 12,
                            right: 12,
                            position: "absolute",
                        }}>
                        <AntDesign name="close" color={COLORS.white} size={30} />
                    </TouchableOpacity>
                    <Text style={{
                        color: COLORS.white,
                        fontFamily: fonts.novaRegular,
                        fontSize: widthPercentageToDP(5),
                        textAlign: "center",
                        marginTop: 40,
                        width: "80%",
                        alignSelf: "center"
                    }}  >
                        {login?.data?.PruebaPopUpText}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(login?.data?.paylink)
                        }}
                        style={styles.btnStyle}
                    >
                        <FastImage
                            source={images.stripe_btn}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.button}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => Linking.openURL('https://api.whatsapp.com/send/?phone=34621251720&text&type=phone_number&app_absent=0')}>
                        <FastImage
                            source={images.whatsapp_btn}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.button}
                        />
                    </TouchableOpacity>


                    <View style={{ height: 20 }} />
                </FastImage>
            </View>
        </Modal>
    )
}

export default PruebaModal

const styles = StyleSheet.create({
    preubaText: {
        fontSize: widthPercentageToDP(5),
        fontFamily: fonts.novaBold,
        color: '#000',
        marginLeft: widthPercentageToDP(1),
    },
    btnStyle: {
        marginTop: heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(90),
        height: widthPercentageToDP(20),
        alignSelf: 'center',
        //backgroundColor:"yellow"
        //marginTop: heightPercentageToDP(4),
    },
    button: {
        width: '100%',
        height: '100%',
        //marginTop: heightPercentageToDP(5)
    },
})