import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPopup } from '../../Redux/slices/popup-slice'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native'
import { fonts } from '../../utils'

const ResultPopup = () => {
    const dispatch = useDispatch()

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
                    backgroundColor: "rgba(0,0,0,0.1)"

                }} >
                <View style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    width: "75%",
                    padding: 20,
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
                    <Text style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: fonts.novaBold,
                        marginLeft: 20
                    }}>
                        {`${popup_content?.title} ${popup_content?.message}`}
                    </Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default ResultPopup

const styles = StyleSheet.create({})