import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../../constant'
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive'
import { fonts } from '../../../utils'

const SingleHomeView = ({ image, title, array, isOpen, setIsOpen, onPress }) => {

    return (
        <View style={styles.main_view} onPress >
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={setIsOpen}
                style={styles.top_row}
            >
                <View style={styles.image_view} >
                    <Image source={image} style={styles.image} />
                </View>
                <View style={styles.text_view} >
                    <Text style={styles.title} >{title}</Text>
                </View>
            </TouchableOpacity>
            {
                isOpen &&
                array?.map((item, index) => (
                    <TouchableOpacity
                        key={item?.id}
                        activeOpacity={0.6}
                        onPress={() => {
                            setIsOpen()
                            onPress(item?.type)
                        }}
                        style={styles.sub_row}
                    >
                        <View style={styles.sub_image_view} >
                            <Image source={item?.image} style={styles.sub_image} />
                        </View>
                        <View style={styles.sub_text_view} >
                            <Text style={styles.sub_title} >{item?.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default SingleHomeView

const styles = StyleSheet.create({
    main_view: {
        marginTop: 20
    },
    top_row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: widthPercentageToDP(2)
    },
    image_view: {
        height: 100,
        width: 100,
        borderRadius: 80,
        shadowColor: "#ffffff",
        shadowOffset: {
            width: 2,
            height: -2,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 80
    },
    text_view: {
        flex: 1,
        marginTop: -heightPercentageToDP(2),
        marginLeft: widthPercentageToDP(5)
    },
    title: {
        color: COLORS.white,
        fontSize: widthPercentageToDP(8),
        fontFamily: fonts.novaRegular,
    },
    sub_row: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: widthPercentageToDP(20)
    },
    sub_image_view: {
        height: 80,
        width: 80,
        borderRadius: 80,
        shadowColor: "#ffffff",
        shadowOffset: {
            width: 2,
            height: -2,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    sub_image: {
        height: "100%",
        width: "100%",
        borderRadius: 80
    },
    sub_text_view: {
        flex: 1,
        marginTop: -heightPercentageToDP(2),
        marginLeft: widthPercentageToDP(3)
    },
    sub_title: {
        color: COLORS.white,
        fontSize: widthPercentageToDP(5),
        fontFamily: fonts.novaRegular,
    },
})