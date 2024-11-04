import React from 'react'
import { ActivityIndicator, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import Ranking from "../../../Component/Ranking";
import { version, iosVerion } from "../../../../package.json";
import { images } from '../../../constant';
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { fonts } from '../../../utils';


const HomeSliderModal = ({ visible, onPressClose, onPressConfirm }) => {


    const {
        login,
        AuthLoading,
        newsCount,
        chatCount,
        reviewRanking,
        allNotifications,
        RV_Images,
        token,
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
                        <Text style={styles.topTitle}>
                            {!reviewRanking?.username
                                ? login?.data?.email
                                : reviewRanking?.username}
                        </Text>
                        <View style={styles.navigationHeader}>
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
                                activeOpacity={0.6}
                                onPress={onPressClose}
                            >
                                <Icon2 name="close" color="#ffff" size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalTitle}>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
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
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
    },
    navigation: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
    },
    topModal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: widthPercentageToDP(100),
        marginTop: Platform.OS === 'android' ? heightPercentageToDP(5) : heightPercentageToDP(10),
        marginLeft: widthPercentageToDP(3),
    },
    topTitle: {
        fontSize: widthPercentageToDP(5),
        fontFamily: fonts.novaBold,
        color: '#ffff',
    },
    navigationHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        right: '5%',
        zIndex: 3
    },
    loaderStyle: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(3),
    },
    modalTitle: {
        width: widthPercentageToDP(100),
        // position: "absolute",
        // left: "4%",
        // top: '4%'
        marginLeft: widthPercentageToDP(3),
    },
    modalTileView: {
        width: widthPercentageToDP(40),
    },
    modalTitleDetail: {
        width: widthPercentageToDP(60),
    },
    ModalTitleText3: {
        fontSize: widthPercentageToDP(4.3),
        fontFamily: fonts.novaBold,
        color: '#ffff',
        marginLeft: widthPercentageToDP(3),
    },
    ModalTitleText: {
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        color: '#ffff',
    },
    mainModalView: {
        flex: 1,
        //marginTop: heightPercentageToDP(10)
    },
    versionText: {
        position: 'absolute',
        bottom: '1%',
        right: '7%',
        fontSize: widthPercentageToDP(3.5),
        fontFamily: fonts.elegance,
        color: '#ffff',
        marginTop: heightPercentageToDP(10),
    },
})