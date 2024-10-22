import { Modal, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPopup } from '../../Redux/slices/popup-slice'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native'
import { fonts } from '../../utils'

const ResultPopup = () => {
    const dispatch = useDispatch()
    const { height, width } = useWindowDimensions()

    const { show_popup, popup_content } = useSelector(state => state.popup)

    const onClose = () => {
        dispatch(setShowPopup(false))
    }

    return (
        <Modal visible={show_popup} transparent onRequestClose={onClose} >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    marginTop: (height > width && Platform.OS === 'ios') ? 35 : 0

                }} >
                <View style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    width: width > height ? "75%" : "95%",
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",

                }}  >

                    <FastImage
                        source={{
                            uri: popup_content?.data?.image,
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={{
                            height: 60,
                            width: 60
                        }}
                    />
                    <View style={{ flex: 1, marginLeft: 20 }} >
                        <Text >
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                fontFamily: fonts.novaBold,
                            }} >

                                {popup_content?.title}
                            </Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontSize: 16,
                                    fontFamily: fonts.novaRegular,
                                }}
                            >
                                {" ha aprobado "}
                            </Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                fontFamily: fonts.novaBold,
                            }} >

                                {popup_content?.data?.examname}
                            </Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                fontFamily: fonts.novaRegular,
                            }} >

                                {" con "}
                            </Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                fontFamily: fonts.novaBold,
                            }} >

                                {popup_content?.data?.score}
                            </Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                fontFamily: fonts.novaRegular,
                            }} >

                                {" puntos. "}
                            </Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                fontFamily: fonts.novaRegular,
                            }} >

                                {"¡Enhorabuena!"}
                            </Text>

                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default ResultPopup

const styles = StyleSheet.create({})