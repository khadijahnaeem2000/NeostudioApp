import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP } from '../../../Component/MakeMeResponsive'
import { COLORS, SIZES } from '../../../constant'
import FastImage from 'react-native-fast-image'

const SingleTopView = ({ image, text }) => {
    return (
        <View style={styles.image_view} >
            <FastImage
                source={image}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image}
            />
            <Text style={styles.image_text} >{text}</Text>
        </View>
    )
}

export default SingleTopView

const styles = StyleSheet.create({
    image_view: {
        width: "17%"
    },
    image: {
        width: "100",
        height: 50,
    },
    image_text: {
        color: COLORS.white,
        fontSize: widthPercentageToDP(2.3),
        textAlign: "center",
        marginTop: SIZES.padding2 / 3
    },
})