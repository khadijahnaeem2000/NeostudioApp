import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive'
import { fonts } from 'react-native-elements/dist/config'
import { COLORS } from '../../../constant'
import { isIOS } from '../../../constant/theme'

const TopImageView = ({ image, title, title2 }) => {
    return (
        <View style={styles.main_view} >
            <FastImage
                source={image}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                    height: heightPercentageToDP(8),
                    width: widthPercentageToDP(10),
                }}
            />
            <Text style={styles.smallTxt}  numberOfLines={1} >{title}</Text>
            {
                title2 &&
                <Text style={styles.smallTxt2} >{title2}</Text>
            }
        </View>
    )
}

export default TopImageView

const styles = StyleSheet.create({
    main_view: {
        height: "100%",
        marginRight: 3,
        alignItems: "center",
        width: widthPercentageToDP(13),
    },
    smallTxt: {
        marginTop: heightPercentageToDP(-1),
        color: COLORS.white,
        fontSize: heightPercentageToDP(1.1),
        fontFamily: fonts.novaBold,
    },
    smallTxt2: {
        marginTop: heightPercentageToDP(0.5),
        color: COLORS.white,
        fontSize: widthPercentageToDP(2),
        fontFamily: fonts.novaRegular,
    },
})