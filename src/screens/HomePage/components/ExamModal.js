import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { images } from '../../../constant';
import { getVerticalRanking } from '../../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Ranking from "../../../Component/Ranking";
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive';
import { fonts } from '../../../utils';

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
                        <View style={styles.mainModalVie}>
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
                                <View style={styles.jump} />
                            </ScrollView>
                        </View>
                    </FastImage>
                </View>
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

export default ExamModal

const styles = StyleSheet.create({

    modalMain: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerModal: {
        width: "100%",
        height: "100%",
        marginBottom: widthPercentageToDP(10),
        marginLeft: widthPercentageToDP(5),
        marginRight: widthPercentageToDP(5)
      },
      navigation: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100)
      },
      topModal: {
        flexDirection: "row-reverse",
        marginTop: heightPercentageToDP(5),
        marginRight: Platform.OS === 'android' ? widthPercentageToDP(10) : heightPercentageToDP(10)
      },
      navigationHeader: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginRight: widthPercentageToDP(5),
        marginTop: Platform.OS === 'android' ? 0 : heightPercentageToDP(3),
        //backgroundColor:"red"
        // position: "absolute",
        // right: "4%",
        // top: "4%"
      },
      loaderStyle: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(3)
      },
      mainModalView: {
        flex: 1,
        marginTop: heightPercentageToDP(2)
      },
      titleText: {
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
        marginTop: heightPercentageToDP(1),
        marginBottom: widthPercentageToDP(4)
      },
      jump: { marginBottom: heightPercentageToDP(30) },
      viewHeight: {
        marginTop: heightPercentageToDP(4)
      },
      courseItem:{
         width:widthPercentageToDP(100),
         alignItems: "center", 
         flexDirection:"row",
         marginLeft:widthPercentageToDP(2) 
        },
        topHeight:{
          marginTop:heightPercentageToDP(37),
          //backgroundColor:"red"
        }
})