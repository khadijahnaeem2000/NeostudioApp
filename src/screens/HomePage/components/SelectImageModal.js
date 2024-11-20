import { FlatList, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { COLORS } from '../../../constant';

const SelectImageModal = ({ visible, onPressClose, onPress }) => {
    const { RV_Images } = useSelector(state => state.user)
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onPressClose}
        >
            <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
                <View
                    style={{
                        height: heightPercentageToDP(3.5),
                        marginTop:
                            Platform.OS === "android" ? 0 : heightPercentageToDP(5),
                    }}
                />
                <Text
                    style={[
                        styles.text2,
                        {
                            textAlign: "center",
                            width: "100%",
                            color:COLORS.text_black_color
                        },
                    ]}
                >
                    {"Seleccione la imagen de las siguientes"}
                </Text>
                {!RV_Images || !RV_Images.avatar.length ? (
                    <View />
                ) : (
                    <FlatList
                        data={RV_Images.avatar}
                        keyExtractor={(item, index) => "unique" + index}
                        style={{ marginTop: heightPercentageToDP(2) }}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#ffff",
                                        borderRadius: widthPercentageToDP(4),
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: widthPercentageToDP(48),
                                        height: widthPercentageToDP(48),
                                        margin: widthPercentageToDP(1),
                                        shadowColor: "#999",
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 2,
                                        shadowRadius: 2,
                                        elevation: 5,
                                    }}
                                    onPress={() => onPress('avatar', "https://neoestudio.net/" + item.material)}
                                // this.setState({ selectImage: false }, () => {
                                //     this._handlePostImage(
                                //       "avatar",
                                //       "https://neoestudio.net/" + item.material
                                //     );
                                //   })
                                >
                                    <FastImage
                                        style={{
                                            width: widthPercentageToDP(48),
                                            height: heightPercentageToDP(20),

                                            //backgroundColor:"red"
                                        }}
                                        source={{
                                            uri: "https://neoestudio.net/" + item.material,
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}
            </View>
        </Modal>
    )
}

export default SelectImageModal

const styles = StyleSheet.create({})