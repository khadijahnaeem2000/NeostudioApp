import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { fonts } from 'react-native-elements/dist/config'
import { COLORS } from '../../../constant'
import { SIZES } from '../../../constant/theme'

const TopImageView = ({ image, title, title2, imageStyle, titleStyle }) => {
    return (
        <View style={styles.main_view} >
            <FastImage
                source={image}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                    height: "55%",
                    width: "75%",
                    ...imageStyle
                }}
            />
            <Text style={[styles.smallTxt, titleStyle ]} numberOfLines={1} >{title}</Text>
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
        width: "18.5%",
    },
    smallTxt: {
        marginTop: -SIZES.padding2,
        color: COLORS.white,
        fontSize: SIZES.h7,
        fontFamily: fonts.novaBold,
    },
    smallTxt2: {
        marginTop: SIZES.padding2 / 3,
        color: COLORS.white,
        fontSize: SIZES.h7,
        fontFamily: fonts.novaRegular,
    },
})