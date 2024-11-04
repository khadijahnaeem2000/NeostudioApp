import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, images, SIZES } from '../../../constant'
import { SvgXml } from 'react-native-svg'
import { ai_message_icon, copy_icon, like_icon, refresh_icon, speaker_icon, unlike_icon, user_icon } from '../../../assets/icons'
import { widthPercentageToDP } from '../../../Component/MakeMeResponsive'
import { fonts } from '../../../utils'
import { TouchableOpacity } from 'react-native'

const SingleMessageView = ({ isuser, message }) => {
    return (
        <View style={styles.main_view} >
            <ImageBackground
                imageStyle={styles.image}
                source={isuser ? images.user_message_background : images.ai_message_background}
                style={isuser ? styles.user_message_view : styles.ai_message_view} >
                <Text style={styles.title} >{message}</Text>
                <View style={styles.icon_view} >
                    <SvgXml height={35} xml={isuser ? user_icon : ai_message_icon} />
                </View>
            </ImageBackground>
            {
                !isuser &&
                <View style={styles.icon_row} >
                    <TouchableOpacity activeOpacity={0.6} style={styles.bottom_icon_view} >
                        <SvgXml height={20} xml={speaker_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.bottom_icon_view} >
                        <SvgXml height={20} xml={like_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.bottom_icon_view} >
                        <SvgXml height={20} xml={unlike_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.bottom_icon_view} >
                        <SvgXml height={20} xml={refresh_icon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.bottom_icon_view} >
                        <SvgXml height={20} xml={copy_icon} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default SingleMessageView

const styles = StyleSheet.create({
    main_view: {
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.padding
    },
    user_message_view: {
        flexDirection: "row",
        alignItems: "center",
        width: "75%",
        minHeight: 80,
        alignSelf: "flex-end",
    },
    ai_message_view: {
        flexDirection: "row-reverse",
        alignItems: "center",
        width: "75%",
        minHeight: 80
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: SIZES.padding
    },
    title: {
        flex: 1,
        color: COLORS.white,
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.novaRegular,
        margin: SIZES.padding2,
    },
    icon_view: {
        height: SIZES.padding * 2,
        width: SIZES.padding * 1.5,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: SIZES.padding2
    },
    icon_row: {
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: SIZES.padding
    },
    bottom_icon_view: {
        height: SIZES.padding,
        width: SIZES.padding,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZES.padding
    }
})