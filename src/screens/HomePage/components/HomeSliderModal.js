import React from 'react'
import { ActivityIndicator, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import Ranking from "../../../Component/Ranking";
import { version, iosVerion } from "../../../../package.json";
import { COLORS, images, SIZES } from '../../../constant';
import { fonts } from '../../../utils';
import Icon2 from "react-native-vector-icons/dist/AntDesign";


const HomeSliderModal = ({ visible, onPressClose, onPressConfirm }) => {

    const {
        login,
        AuthLoading,
        reviewRanking,
    } = useSelector(state => state.user)

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onPressClose}
        >
            <View style={styles.modalMain}>
                <FastImage
                    source={images.navigation_slider}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.topModal}>
                        <Text
                            numberOfLines={1}
                            style={styles.topTitle}>
                            {!reviewRanking?.username
                                ? login?.data?.email
                                : reviewRanking?.username}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={onPressConfirm}
                        >
                            <FastImage
                                style={styles.loaderStyle}
                                resizeMode={FastImage.resizeMode.contain}
                                source={images.loader}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginRight: SIZES.padding }}
                            activeOpacity={0.6}
                            onPress={onPressClose}
                        >
                            <Icon2 name="close" color="#ffff" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalTitle}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View style={styles.modalTileView}>
                                <Text style={styles.ModalTitleText}>{"Usuario:"}</Text>
                                <Text style={styles.ModalTitleText}>{"Baremo:"}</Text>
                                <Text style={styles.ModalTitleText}>
                                    {"Nº alumnos ranking:"}
                                </Text>
                            </View>
                            <View style={styles.modalTitleDetail}>
                                <Text style={styles.ModalTitleText3}>
                                    {login?.data?.studentCode}
                                </Text>
                                <Text style={styles.ModalTitleText3}>
                                    {login?.data?.baremo}
                                </Text>
                                <Text style={styles.ModalTitleText3}>
                                    {reviewRanking?.numberOfStudents}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mainModalView}>

                        {!reviewRanking ? (
                            <View />
                        ) : (
                            reviewRanking.data.courses.map((item, index) => {
                                return (
                                    <Ranking
                                        key={"unique" + index}
                                        subject={item.rankName}
                                        //subject={"Rank. Tema 1 - Derecho penal con baremo"}
                                        getPoints={item.points}
                                        //totalPoints={item.totalPoints}
                                        minLength={
                                            item.percentage === null
                                                ? "null"
                                                : Math.round(item.percentage) > 100
                                                    ? 100
                                                    : Math.round(item.percentage)
                                        }
                                        maxLength={
                                            item.percentage === null
                                                ? 100
                                                : 100 - Math.round(item.percentage)
                                        }
                                        obtainPercentage={
                                            item.percentage === null
                                                ? "null"
                                                : Math.round(item.percentage)
                                        }
                                        drawer={true}
                                        isHome={true}
                                    />
                                );
                            })
                        )}
                        <Text style={styles.versionText}>
                            {"versión: "}
                            {Platform.OS === "android" ? version : iosVerion}
                        </Text>
                        {/* <View style={styles.jump} /> */}

                    </View>
                    <View style={{ height: 20, }} />
                </ScrollView>
                {/* </FastImage> */}
            </View>
            {AuthLoading && (
                <ActivityIndicator
                    size="large"
                    color="#000"
                    style={styles.loading}
                />
            )}
        </Modal>

    )

}


export default HomeSliderModal


const styles = StyleSheet.create({
    modalMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    navigation: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    topModal: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? SIZES.padding * 3 : SIZES.padding * 5,
        paddingHorizontal: SIZES.padding2
    },
    topTitle: {
        fontSize: SIZES.h16,
        fontFamily: fonts.novaBold,
        color: COLORS.white,
        textAlign: "left",
        flex: 1,
    },
    loaderStyle: {
        width: SIZES.padding * 1.8,
        height: SIZES.padding * 1.8,
        marginRight: SIZES.padding2,
    },
    modalTitle: {
        marginLeft: SIZES.padding2,
    },
    modalTileView: {
        width: "40%"
    },
    modalTitleDetail: {
        width: "60%"
    },
    ModalTitleText3: {
        fontSize: SIZES.h14,
        fontFamily: fonts.novaBold,
        color: '#ffff',
        marginLeft: SIZES.padding2,
    },
    ModalTitleText: {
        fontSize: SIZES.h12,
        fontFamily: fonts.elegance,
        color: '#ffff',
    },
    mainModalView: {
        flex: 1,
    },
    versionText: {
        position: 'absolute',
        bottom: '1%',
        right: '7%',
        fontSize: SIZES.h11,
        fontFamily: fonts.elegance,
        color: '#ffff',
    },
})