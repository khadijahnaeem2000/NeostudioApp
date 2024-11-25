import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { images, SIZES } from '../../../constant';
import { getVerticalRanking } from '../../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Ranking from "../../../Component/Ranking";
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { fonts } from '../../../utils';
import { LoaderModal, SizedBox } from '../../../Component';

const ExamModal = ({ visible, onPressClose }) => {
    const dispatch = useDispatch()
    const { login, verticalRanking, AuthLoading } = useSelector(state => state.user)
    return (
        <Modal
            transparent={true}
            visible={visible}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={onPressClose}>
            <View style={styles.modalMain}>
                <View style={styles.innerModal}>
                    <FastImage
                        source={images.navigation_slider}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.navigation}>
                        <View style={styles.topModal}>
                            <View style={styles.navigationHeader}>
                                <TouchableOpacity
                                    onPress={() =>
                                        dispatch(getVerticalRanking(login?.data?.id))
                                    }>
                                    <FastImage
                                        style={styles.loaderStyle}
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={images.loader}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPressClose}>
                                    <Icon2 name="close" color="#ffff" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mainModalView}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {!verticalRanking ? (
                                    <View />
                                ) : (
                                    verticalRanking.data.map((item, index) => {
                                        return (
                                            <View key={'unique' + index}>
                                                <Text style={styles.titleText}>
                                                    {item?.folderName}
                                                </Text>
                                                {item?.courses?.map((item, index) => {
                                                    return (
                                                        <Ranking
                                                            key={'unique' + index}
                                                            subject={item.rankName}
                                                            getPoints={item.points}
                                                            totalPoints={item.totalPoints}
                                                            minLength={
                                                                item.percentage === 'null'
                                                                    ? 'null'
                                                                    : item.percentage
                                                            }
                                                            maxLength={
                                                                item.percentage === 'null'
                                                                    ? 100
                                                                    : 100 - item.percentage
                                                            }
                                                            obtainPercentage={
                                                                item.percentage === 'null'
                                                                    ? 'null'
                                                                    : item.percentage
                                                            }
                                                            drawer={true}
                                                        />
                                                    );
                                                })}
                                                <Ranking
                                                    subject={item.withoutBaremo.rankName}
                                                    getPoints={item.withoutBaremo.points}
                                                    totalPoints={item.withoutBaremo.totalPoints}
                                                    minLength={
                                                        item.withoutBaremo.percentage === null
                                                            ? 'null'
                                                            : item.withoutBaremo.percentage
                                                    }
                                                    maxLength={
                                                        item.withoutBaremo.percentage === null
                                                            ? 100
                                                            : 100 - item.withoutBaremo.percentage
                                                    }
                                                    obtainPercentage={
                                                        item.withoutBaremo.percentage === null
                                                            ? 'null'
                                                            : item.withoutBaremo.percentage
                                                    }
                                                    drawer={true}
                                                />
                                                <Ranking
                                                    subject={item.withBaremo.rankName}
                                                    getPoints={item.withBaremo.points}
                                                    totalPoints={item.withBaremo.totalPoints}
                                                    minLength={
                                                        item.withBaremo.percentage === null
                                                            ? 'null'
                                                            : item.withBaremo.percentage
                                                    }
                                                    maxLength={
                                                        item.withBaremo.percentage === null
                                                            ? 100
                                                            : 100 - item.withBaremo.percentage
                                                    }
                                                    obtainPercentage={
                                                        item.withBaremo.percentage === null
                                                            ? 'null'
                                                            : item.withBaremo.percentage
                                                    }
                                                    drawer={true}
                                                />
                                            </View>
                                        );
                                    })
                                )}
                                <SizedBox />
                            </ScrollView>
                        </View>
                    </FastImage>
                </View>
            </View>
            <LoaderModal  visible={AuthLoading} />
        </Modal>
    )
}

export default ExamModal

const styles = StyleSheet.create({
    modalMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerModal: {
        width: "100%",
        height: "100%",
        marginBottom: SIZES.padding * 2,
        marginLeft: SIZES.padding,
        marginRight: SIZES.padding
    },
    navigation: {
        width: "100%",
        height: "100%"
    },
    topModal: {
        flexDirection: "row-reverse",
        marginTop: SIZES.padding * 2.5,
        marginRight: SIZES.padding * 2
    },
    navigationHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: SIZES.padding,
        marginTop: Platform.OS === 'android' ? 0 : SIZES.padding * 1.5,
    },
    loaderStyle: {
        width: SIZES.padding * 1.8,
        height: SIZES.padding * 1.8,
        marginRight: SIZES.padding2
    },
    mainModalView: {
        flex: 1,
    },
    titleText: {
        fontSize: SIZES.h18,
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
        marginTop: SIZES.padding2 * 0.8,
        marginBottom: SIZES.padding * 0.95
    },
    courseItem: {
        alignItems: "center",
        flexDirection: "row",
        marginLeft: SIZES.padding
    },
})